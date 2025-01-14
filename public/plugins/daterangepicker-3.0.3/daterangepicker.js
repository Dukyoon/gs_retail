/**
 * @version: 3.1
 * @author: Dan Grossman http://www.dangrossman.info/
 * @copyright: Copyright (c) 2012-2019 Dan Grossman. All rights reserved.
 * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
 * @website: http://www.daterangepicker.com/
 */
// Following the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Make globaly available as well
    define(['dayjs', 'jquery'], (dayjs, jquery) => {
      if (!jquery.fn) jquery.fn = {}; // webpack server rendering
      if (typeof dayjs !== 'function' && dayjs.hasOwnProperty('default')) dayjs = dayjs.default;
      return factory(dayjs, jquery);
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node / Browserify
    // isomorphic issue
    let jQuery = (typeof window !== 'undefined') ? window.jQuery : undefined;
    if (!jQuery) {
      jQuery = require('jquery');
      if (!jQuery.fn) jQuery.fn = {};
    }
    const dayjs = (typeof window !== 'undefined' && typeof window.dayjs !== 'undefined') ? window.dayjs : require('dayjs');
    module.exports = factory(dayjs, jQuery);
  } else {
    // Browser globals
    root.daterangepicker = factory(root.dayjs, root.jQuery);
  }
}(typeof window !== 'undefined' ? window : this, (dayjs, $) => {
  const DateRangePicker = function (element, options, cb) {
    // default settings for options
    this.parentEl = 'body';
    this.element = $(element);
    this.startDate = dayjs().startOf('day');
    this.endDate = dayjs().endOf('day').subtract(59, "m");
    this.minDate = false;
    this.maxDate = false;
    this.maxSpan = false;
    this.autoApply = false;
    this.singleDatePicker = false;
    this.showDropdowns = false;
    this.minYear = dayjs().subtract(100, 'year').format('YYYY');
    this.maxYear = dayjs().add(100, 'year').format('YYYY');
    this.showWeekNumbers = false;
    this.showISOWeekNumbers = false;
    this.showCustomRangeLabel = true;
    this.timePicker = false;
    this.timePicker24Hour = false;
    this.timePickerIncrement = 1;
    this.timePickerSeconds = false;
    this.linkedCalendars = true;
    this.autoUpdateInput = true;
    this.alwaysShowCalendars = false;
    this.ranges = {};
    this.rangesConfig = '111111000000';
    this.startChosenLabel = '최근 7일';
    this.startSpanId = `${this.element[0].id}_span`;

    this.opens = 'right';
    if (this.element.hasClass('pull-right')) this.opens = 'left';

    this.drops = 'down';
    if (this.element.hasClass('dropup')) this.drops = 'up';

    this.buttonClasses = 'btn btn-sm';
    this.applyButtonClasses = 'btn-primary';
    this.cancelButtonClasses = 'btn-default';

    this.locale = {
      direction: 'ltr',
      format: dayjs.localeData().longDateFormat('L'),
      separator: ' - ',
      applyLabel: 'Apply',
      cancelLabel: 'Cancel',
      weekLabel: 'W',
      customRangeLabel: 'Custom Range',
      daysOfWeek: dayjs.weekdaysMin(),
      monthNames: dayjs.monthsShort(),
      firstDay: dayjs.localeData().firstDayOfWeek(),
    };

    this.callback = function () { };

    // some state information
    this.isShowing = false;
    this.leftCalendar = {};
    this.rightCalendar = {};

    // custom options from user
    if (typeof options !== 'object' || options === null) options = {};

    // allow setting options with data attributes
    // data-api options will be overwritten with custom javascript options
    options = $.extend(this.element.data(), options);

    // html template for the picker UI
    if (typeof options.template !== 'string' && !(options.template instanceof $)) {
      options.template = '<div class="daterangepicker">'
          + '<div class="ranges"></div>'
          + '<div class="drp-calendar left">'
          + '<div class="calendar-table"></div>'
          + '<div class="calendar-time"></div>'
          + '</div>'
          + '<div class="drp-calendar right">'
          + '<div class="calendar-table"></div>'
          + '<div class="calendar-time"></div>'
          + '</div>'
          + '<div class="drp-buttons">'
          + '<span class="daterangepicker-range-txt"></span>'
          + '<span class="drp-selected"></span>'
          + '<button class="cancelBtn" type="button"></button>'
          + '<button class="applyBtn" disabled="disabled" type="button"></button> '
          + '</div>'
          + '</div>';
    }

    this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
    this.container = $(options.template).appendTo(this.parentEl);

    //
    // handle all the possible options overriding defaults
    //

    if (typeof options.locale === 'object') {
      if (typeof options.locale.direction === 'string') this.locale.direction = options.locale.direction;

      if (typeof options.locale.format === 'string') this.locale.format = options.locale.format;

      if (typeof options.locale.paramFormat === 'string') this.locale.paramFormat = options.locale.paramFormat;

      if (typeof options.locale.separator === 'string') this.locale.separator = options.locale.separator;

      if (typeof options.locale.daysOfWeek === 'object') this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

      if (typeof options.locale.monthNames === 'object') this.locale.monthNames = options.locale.monthNames.slice();

      if (typeof options.locale.firstDay === 'number') this.locale.firstDay = options.locale.firstDay;

      if (typeof options.locale.applyLabel === 'string') this.locale.applyLabel = options.locale.applyLabel;

      if (typeof options.locale.cancelLabel === 'string') this.locale.cancelLabel = options.locale.cancelLabel;

      if (typeof options.locale.weekLabel === 'string') this.locale.weekLabel = options.locale.weekLabel;

      if (typeof options.locale.customRangeLabel === 'string') {
        // Support unicode chars in the custom range name.
        var elem = document.createElement('textarea');
        elem.innerHTML = options.locale.customRangeLabel;
        var rangeHtml = elem.value;
        this.locale.customRangeLabel = rangeHtml;
      }
    }
    this.container.addClass(this.locale.direction);

    if (typeof options.startDate === 'string') this.startDate = dayjs(options.startDate, this.locale.format);

    if (typeof options.endDate === 'string') this.endDate = dayjs(options.endDate, this.locale.format);

    if (typeof options.minDate === 'string') this.minDate = dayjs(options.minDate, this.locale.format);

    if (typeof options.maxDate === 'string') this.maxDate = dayjs(options.maxDate, this.locale.format);

    if (typeof options.startDate === 'object') this.startDate = dayjs(options.startDate);

    if (typeof options.endDate === 'object') this.endDate = dayjs(options.endDate);

    if (typeof options.minDate === 'object') this.minDate = dayjs(options.minDate);

    if (typeof options.maxDate === 'object') this.maxDate = dayjs(options.maxDate);

    // sanity check for bad options
    if (this.minDate && this.startDate.isBefore(this.minDate)) this.startDate = this.minDate.clone();

    // sanity check for bad options
    if (this.maxDate && this.endDate.isAfter(this.maxDate)) this.endDate = this.maxDate.clone();

    if (typeof options.applyButtonClasses === 'string') this.applyButtonClasses = options.applyButtonClasses;

    if (typeof options.applyClass === 'string') // backwards compat
    { this.applyButtonClasses = options.applyClass; }

    if (typeof options.cancelButtonClasses === 'string') this.cancelButtonClasses = options.cancelButtonClasses;

    if (typeof options.cancelClass === 'string') // backwards compat
    { this.cancelButtonClasses = options.cancelClass; }

    if (typeof options.maxSpan === 'object') this.maxSpan = options.maxSpan;

    if (typeof options.dateLimit === 'object') // backwards compat
    { this.maxSpan = options.dateLimit; }

    if (typeof options.opens === 'string') this.opens = options.opens;

    if (typeof options.drops === 'string') this.drops = options.drops;

    if (typeof options.showWeekNumbers === 'boolean') this.showWeekNumbers = options.showWeekNumbers;

    if (typeof options.showISOWeekNumbers === 'boolean') this.showISOWeekNumbers = options.showISOWeekNumbers;

    if (typeof options.buttonClasses === 'string') this.buttonClasses = options.buttonClasses;

    if (typeof options.buttonClasses === 'object') this.buttonClasses = options.buttonClasses.join(' ');

    if (typeof options.showDropdowns === 'boolean') this.showDropdowns = options.showDropdowns;

    if (typeof options.minYear === 'number') this.minYear = options.minYear;

    if (typeof options.maxYear === 'number') this.maxYear = options.maxYear;

    if (typeof options.showCustomRangeLabel === 'boolean') this.showCustomRangeLabel = options.showCustomRangeLabel;

    if (typeof options.singleDatePicker === 'boolean') {
      this.singleDatePicker = options.singleDatePicker;
      if (this.singleDatePicker) this.endDate = this.startDate.clone();
    }

    if (typeof options.timePicker === 'boolean') this.timePicker = options.timePicker;

    if (typeof options.timePickerSeconds === 'boolean') this.timePickerSeconds = options.timePickerSeconds;

    if (typeof options.timePickerIncrement === 'number') this.timePickerIncrement = options.timePickerIncrement;

    if (typeof options.timePicker24Hour === 'boolean') this.timePicker24Hour = options.timePicker24Hour;

    if (typeof options.autoApply === 'boolean') this.autoApply = options.autoApply;

    if (typeof options.autoUpdateInput === 'boolean') this.autoUpdateInput = options.autoUpdateInput;

    if (typeof options.linkedCalendars === 'boolean') this.linkedCalendars = options.linkedCalendars;

    if (typeof options.isInvalidDate === 'function') this.isInvalidDate = options.isInvalidDate;

    if (typeof options.isCustomDate === 'function') this.isCustomDate = options.isCustomDate;

    if (typeof options.alwaysShowCalendars === 'boolean') this.alwaysShowCalendars = options.alwaysShowCalendars;

    if (typeof options.startChosenLabel === 'string') this.startChosenLabel = options.startChosenLabel;

    if (typeof options.startSpanId === 'string') this.startSpanId = options.startSpanId;

    // update day names order to firstDay
    if (this.locale.firstDay != 0) {
      let iterator = this.locale.firstDay;
      while (iterator > 0) {
        this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
        iterator--;
      }
    }

    let start; let end; let
      range;

    // if no start/end dates set, check if an input element contains initial values
    if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
      if ($(this.element).is(':text')) {
        const val = $(this.element).val();
        const split = val.split(this.locale.separator);

        start = end = null;

        if (split.length == 2) {
          start = dayjs(split[0], this.locale.format);
          end = dayjs(split[1], this.locale.format);
        } else if (this.singleDatePicker && val !== '') {
          start = dayjs(val, this.locale.format);
          end = dayjs(val, this.locale.format);
        }
        if (start !== null && end !== null) {
          this.setStartDate(start);
          this.setEndDate(end);
        }
      }
    }

    if (typeof options.ranges === 'object') {
      for (range in options.ranges) {
        if (typeof options.ranges[range][0] === 'string') start = dayjs(options.ranges[range][0], this.locale.format);
        else start = dayjs(options.ranges[range][0]);

        if (typeof options.ranges[range][1] === 'string') end = dayjs(options.ranges[range][1], this.locale.format);
        else end = dayjs(options.ranges[range][1]);

        // If the start or end date exceed those allowed by the minDate or maxSpan
        // options, shorten the range to the allowable period.
        if (this.minDate && start.isBefore(this.minDate)) start = this.minDate.clone();

        let { maxDate } = this;
        if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate)) maxDate = start.clone().add(this.maxSpan);
        if (maxDate && end.isAfter(maxDate)) end = maxDate.clone();

        // If the end of the range is before the minimum or the start of the range is
        // after the maximum, don't display this range option at all.
        if ((this.minDate && end.isBefore(this.minDate, this.timepicker ? 'minute' : 'day'))
            || (maxDate && start.isAfter(maxDate, this.timepicker ? 'minute' : 'day'))) continue;

        // Support unicode chars in the range names.
        var elem = document.createElement('textarea');
        elem.innerHTML = range;
        var rangeHtml = elem.value;

        this.ranges[rangeHtml] = [start, end];
      }

      let rangesIndex = 0;
      let list = '<ul>';
      for (range in this.ranges) {
            	if (this.rangesConfig[rangesIndex++] == '1') {
                	list += `<li data-range-key="${range}">${range}</li>`;
        } else {
                	list += `<li data-range-key="${range}" style="display:none;">${range}</li>`;
        }
      }
      if (this.showCustomRangeLabel) {
        list += `<li data-range-key="${this.locale.customRangeLabel}">${this.locale.customRangeLabel}</li>`;
      }
      list += '</ul>';
      this.container.find('.ranges').prepend(list);
    }

    if (typeof cb === 'function') {
      this.callback = cb;
    }

    if (!this.timePicker) {
      this.startDate = this.startDate.startOf('day');
      this.endDate = this.endDate.endOf('day');
      this.container.find('.calendar-time').hide();
    }

    // can't be used together for now
    if (this.timePicker && this.autoApply) this.autoApply = false;

    if (this.autoApply) {
      this.container.addClass('auto-apply');
    }

    if (typeof options.ranges === 'object') this.container.addClass('show-ranges');

    if (this.singleDatePicker) {
      this.container.addClass('single');
      this.container.find('.drp-calendar.left').addClass('single');
      this.container.find('.drp-calendar.left').show();
      this.container.find('.drp-calendar.right').hide();
      if (!this.timePicker) {
        this.container.addClass('auto-apply');
      }
    }

    if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
      this.container.addClass('show-calendar');
    }

    this.container.addClass(`opens${this.opens}`);

    // apply CSS classes and labels to buttons
    this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
    if (this.applyButtonClasses.length) this.container.find('.applyBtn').addClass(this.applyButtonClasses);
    if (this.cancelButtonClasses.length) this.container.find('.cancelBtn').addClass(this.cancelButtonClasses);
    this.container.find('.applyBtn').html(this.locale.applyLabel);
    this.container.find('.cancelBtn').html(this.locale.cancelLabel);

    //
    // event listeners
    //

    this.container.find('.drp-calendar')
      .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
      .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
      .on('mousedown.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
      .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
      .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
      .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
      .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this));

    this.container.find('.ranges')
      .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this));

    this.container.find('.drp-buttons')
      .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
      .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this));

    if (this.element.is('input') || this.element.is('button')) {
      this.element.on({
        'click.daterangepicker': $.proxy(this.show, this),
        'focus.daterangepicker': $.proxy(this.show, this),
        'keyup.daterangepicker': $.proxy(this.elementChanged, this),
        'keydown.daterangepicker': $.proxy(this.keydown, this), // IE 11 compatibility
      });
    } else {
      this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
      this.element.on('keydown.daterangepicker', $.proxy(this.toggle, this));
    }

    //
    // if attached to a text input, set the initial value
    //

    //        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
    //            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
    //            this.element.trigger('change');
    //        } else if (this.element.is('input') && this.autoUpdateInput) {
    //            this.element.val(this.startDate.format(this.locale.format));
    //            this.element.trigger('change');
    //        }

    $(`#${this.startSpanId}`).html(this.startChosenLabel);
    if (!this.autoUpdateInput) { $(`#${this.startSpanId}`).hide(); }

    this.updateElement();
  };

  DateRangePicker.prototype = {

    constructor: DateRangePicker,

    _interval() {
        	return this.endDate.diff(this.startDate, 'd') + 1;
    },

    addInterval() {
       	 	const interval = this._interval();
       	 	this.setStartDate(this.startDate.add(interval, 'd'));
       	 	this.setEndDate(this.endDate.add(interval, 'd'));
      this.calculateChosenLabel();
      $(`#${this.startSpanId}`).html(this.chosenLabel);

      /* apply 시에는 전부 적용이다. */
      $(`#${this.startSpanId}`).show();
      this.autoUpdateInput = true;
      /* */

      this.element.trigger('apply.daterangepicker');
    },

    subtractInterval() {
       		const interval = this._interval();
       		this.setStartDate(this.startDate.subtract(interval, 'd'));
       		this.setEndDate(this.endDate.subtract(interval, 'd'));
       		this.calculateChosenLabel();
       		$(`#${this.startSpanId}`).html(this.chosenLabel);

       		/* apply 시에는 전부 적용이다. */
      $(`#${this.startSpanId}`).show();
      this.autoUpdateInput = true;
      /* */

       		this.element.trigger('apply.daterangepicker');
    },

    getData() {
   			const startDate = this.startDate.format(this.locale.paramFormat);
   			const endDate = this.endDate.format(this.locale.paramFormat);
   			return { startDate, endDate };
    },

    setStartDate(startDate) {
      if (typeof startDate === 'string') this.startDate = dayjs(startDate, this.locale.format);

      if (typeof startDate === 'object') this.startDate = dayjs(startDate);

      if (!this.timePicker) this.startDate = this.startDate.startOf('day');

      if (this.timePicker && this.timePickerIncrement) this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

      if (this.minDate && this.startDate.isBefore(this.minDate)) {
        this.startDate = this.minDate.clone();
        if (this.timePicker && this.timePickerIncrement) this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
      }

      if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
        this.startDate = this.maxDate.clone();
        if (this.timePicker && this.timePickerIncrement) this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
      }

      if (!this.isShowing) this.updateElement();

      this.updateMonthsInView();
    },

    setEndDate(endDate) {
      if (typeof endDate === 'string') this.endDate = dayjs(endDate, this.locale.format);

      if (typeof endDate === 'object') this.endDate = dayjs(endDate);

      if (!this.timePicker) this.endDate = this.endDate.endOf('day');

      if (this.timePicker && this.timePickerIncrement) this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

      if (this.endDate.isBefore(this.startDate)) this.endDate = this.startDate.clone();

      if (this.maxDate && this.endDate.isAfter(this.maxDate)) this.endDate = this.maxDate.clone();

      if (this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate)) this.endDate = this.startDate.clone().add(this.maxSpan);

      this.previousRightTime = this.endDate.clone();

      this.container.find('.drp-selected').html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));

      if (!this.isShowing) this.updateElement();

      this.updateMonthsInView();
    },

    isInvalidDate() {
      return false;
    },

    isCustomDate() {
      return false;
    },

    updateView() {
      if (this.timePicker) {
        this.renderTimePicker('left');
        this.renderTimePicker('right');
        if (!this.endDate) {
          this.container.find('.right .calendar-time select').prop('disabled', true).addClass('disabled');
        } else {
          this.container.find('.right .calendar-time select').prop('disabled', false).removeClass('disabled');
        }
      }
      if (this.endDate) this.container.find('.drp-selected').html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
      this.updateMonthsInView();
      this.updateCalendars();
      this.updateFormInputs();
    },

    updateMonthsInView() {
      if (this.endDate) {
        // if both dates are visible already, do nothing
        if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month
            && (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
            && (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
        ) {
          return;
        }

        this.leftCalendar.month = this.startDate.clone().date(2);
        if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
          this.rightCalendar.month = this.endDate.clone().date(2);
        } else {
          this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
        }
      } else if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
        this.leftCalendar.month = this.startDate.clone().date(2);
        this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
      }
      if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
        this.rightCalendar.month = this.maxDate.clone().date(2);
        this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
      }
    },

    updateCalendars() {
      if (this.timePicker) {
        let hour; let minute; let
          second;
        if (this.endDate) {
          hour = parseInt(this.container.find('.left .hourselect').val(), 10);
          minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
          // if (isNaN(minute)) {
          //   minute = parseInt(this.container.find('.left .minuteselect option:last').val(), 10);
          // }
          second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
          if (!this.timePicker24Hour) {
            var ampm = this.container.find('.left .ampmselect').val();
            if (ampm === 'PM' && hour < 12) hour += 12;
            if (ampm === 'AM' && hour === 12) hour = 0;
          }
        } else {
          hour = parseInt(this.container.find('.right .hourselect').val(), 10);
          minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
          // if (isNaN(minute)) {
          //   minute = parseInt(this.container.find('.right .minuteselect option:last').val(), 10);
          // }
          second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
          if (!this.timePicker24Hour) {
            var ampm = this.container.find('.right .ampmselect').val();
            if (ampm === 'PM' && hour < 12) hour += 12;
            if (ampm === 'AM' && hour === 12) hour = 0;
          }
        }
        this.leftCalendar.month.hour(hour).minute(minute).second(second);
        this.rightCalendar.month.hour(hour).minute(minute).second(second);
      }

      this.renderCalendar('left');
      this.renderCalendar('right');

      // highlight any predefined range matching the current start and end dates
      this.container.find('.ranges li').removeClass('active');
      if (this.endDate == null) return;

      this.calculateChosenLabel();
    },

    renderCalendar(side) {
      //
      // Build the matrix of dates that will populate the calendar
      //

      var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
      const month = calendar.month.month();
      const year = calendar.month.year();
      const hour = calendar.month.hour();
      const minute = calendar.month.minute();
      const second = calendar.month.second();
      const daysInMonth = dayjs([year, month]).daysInMonth();
      const firstDay = dayjs([year, month, 1]);
      const lastDay = dayjs([year, month, daysInMonth]);
      const lastMonth = dayjs(firstDay).subtract(1, 'month').month();
      const lastYear = dayjs(firstDay).subtract(1, 'month').year();
      const daysInLastMonth = dayjs([lastYear, lastMonth]).daysInMonth();
      const dayOfWeek = firstDay.day();

      // initialize a 6 rows x 7 columns array for the calendar
      var calendar = [];
      calendar.firstDay = firstDay;
      calendar.lastDay = lastDay;

      for (var i = 0; i < 6; i++) {
        calendar[i] = [];
      }

      // populate the calendar with date objects
      let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
      if (startDay > daysInLastMonth) startDay -= 7;

      if (dayOfWeek == this.locale.firstDay) startDay = daysInLastMonth - 6;

      let curDate = dayjs([lastYear, lastMonth, startDay, 12, minute, second]);

      var col; var
        row;
      for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = dayjs(curDate).add(24, 'hour')) {
        if (i > 0 && col % 7 === 0) {
          col = 0;
          row++;
        }
        calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
        curDate.hour(12);

        if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
          calendar[row][col] = this.minDate.clone();
        }

        if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
          calendar[row][col] = this.maxDate.clone();
        }
      }

      // make the calendar object available to hoverDate/clickDate
      if (side == 'left') {
        this.leftCalendar.calendar = calendar;
      } else {
        this.rightCalendar.calendar = calendar;
      }

      //
      // Display the calendar
      //

      const minDate = side == 'left' ? this.minDate : this.startDate;
      let { maxDate } = this;
      const selected = side == 'left' ? this.startDate : this.endDate;
      const arrow = this.locale.direction == 'ltr' ? { left: 'chevron-left', right: 'chevron-right' } : { left: 'chevron-right', right: 'chevron-left' };

      let html = '<table class="table-condensed">';
      html += '<thead>';
      html += '<tr>';

      // add empty cell for week number
      if (this.showWeekNumbers || this.showISOWeekNumbers) html += '<th></th>';

      if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
        html += '<th class="prev available"><span></span></th>';
      } else {
        html += '<th></th>';
      }

      let dateHtml = `${calendar[1][1].format('YYYY년 ') + this.locale.monthNames[calendar[1][1].month()]}월`;

      if (this.showDropdowns) {
        const currentMonth = calendar[1][1].month();
        const currentYear = calendar[1][1].year();
        const maxYear = (maxDate && maxDate.year()) || (this.maxYear);
        const minYear = (minDate && minDate.year()) || (this.minYear);
        const inMinYear = currentYear == minYear;
        const inMaxYear = currentYear == maxYear;

        let monthHtml = '<select class="monthselect">';
        for (let m = 0; m < 12; m++) {
          if ((!inMinYear || (minDate && m >= minDate.month())) && (!inMaxYear || (maxDate && m <= maxDate.month()))) {
            monthHtml += `<option value='${m}'${
              m === currentMonth ? " selected='selected'" : ''
            }>${this.locale.monthNames[m]}</option>`;
          } else {
            monthHtml += `<option value='${m}'${
              m === currentMonth ? " selected='selected'" : ''
            } disabled='disabled'>${this.locale.monthNames[m]}</option>`;
          }
        }
        monthHtml += '</select>';

        let yearHtml = '<select class="yearselect">';
        for (let y = minYear; y <= maxYear; y++) {
          yearHtml += `<option value="${y}"${
            y === currentYear ? ' selected="selected"' : ''
          }>${y}</option>`;
        }
        yearHtml += '</select>';

        dateHtml = monthHtml + yearHtml;
      }

      html += `<th colspan="5" class="month">${dateHtml}</th>`;
      if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
        html += '<th class="next available"><span></span></th>';
      } else {
        html += '<th></th>';
      }

      html += '</tr>';
      html += '<tr>';

      // add week number label
      if (this.showWeekNumbers || this.showISOWeekNumbers) html += `<th class="week">${this.locale.weekLabel}</th>`;

      $.each(this.locale.daysOfWeek, (index, dayOfWeek) => {
        html += `<th>${dayOfWeek}</th>`;
      });

      html += '</tr>';
      html += '</thead>';
      html += '<tbody>';

      // adjust maxDate to reflect the maxSpan setting in order to
      // grey out end dates beyond the maxSpan
      if (this.endDate == null && this.maxSpan) {
        const maxLimit = this.startDate.clone().add(this.maxSpan).endOf('day');
        if (!maxDate || maxLimit.isBefore(maxDate)) {
          maxDate = maxLimit;
        }
      }

      for (var row = 0; row < 6; row++) {
        html += '<tr>';

        // add week number
        if (this.showWeekNumbers) html += `<td class="week">${calendar[row][0].week()}</td>`;
        else if (this.showISOWeekNumbers) html += `<td class="week">${calendar[row][0].isoWeek()}</td>`;

        for (var col = 0; col < 7; col++) {
          const classes = [];

          // highlight today's date
          if (calendar[row][col].isSame(new Date(), 'day')) classes.push('today');

          // highlight weekends
          if (calendar[row][col].isoWeekday() > 5) classes.push('weekend');

          // grey out the dates in other months displayed at beginning and end of this calendar
          if (calendar[row][col].month() != calendar[1][1].month()) classes.push('off');

          // don't allow selection of dates before the minimum date
          if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day')) classes.push('off', 'disabled');

          // don't allow selection of dates after the maximum date
          if (maxDate && calendar[row][col].isAfter(maxDate, 'day')) classes.push('off', 'disabled');

          // don't allow selection of date if a custom function decides it's invalid
          if (this.isInvalidDate(calendar[row][col])) classes.push('off', 'disabled');

          // highlight the currently selected start date
          if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) classes.push('active', 'start-date');

          // highlight the currently selected end date
          if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) classes.push('active', 'end-date');

          // highlight dates in-between the selected dates
          if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate) classes.push('in-range');

          // apply custom classes for this date
          const isCustom = this.isCustomDate(calendar[row][col]);
          if (isCustom !== false) {
            if (typeof isCustom === 'string') classes.push(isCustom);
            else Array.prototype.push.apply(classes, isCustom);
          }

          let cname = ''; let
            disabled = false;
          for (var i = 0; i < classes.length; i++) {
            cname += `${classes[i]} `;
            if (classes[i] == 'disabled') disabled = true;
          }
          if (!disabled) cname += 'available';

          html += `<td class="${cname.replace(/^\s+|\s+$/g, '')}" data-title="` + `r${row}c${col}">${calendar[row][col].date()}</td>`;
        }
        html += '</tr>';
      }

      html += '</tbody>';
      html += '</table>';

      this.container.find(`.drp-calendar.${side} .calendar-table`).html(html);
    },

    renderTimePicker(side) {
      // Don't bother updating the time picker if it's currently disabled
      // because an end date hasn't been clicked yet
      if (side == 'right' && !this.endDate) return;

      let html; let selected; let minDate; let
        { maxDate } = this;

      if (this.maxSpan && (!this.maxDate || this.startDate.clone().add(this.maxSpan).isAfter(this.maxDate))) maxDate = this.startDate.clone().add(this.maxSpan);

      if (side == 'left') {
        selected = this.startDate.clone();
        minDate = this.minDate;
      } else if (side == 'right') {
        selected = this.endDate.clone();
        minDate = this.startDate;

        // Preserve the time already selected
        const timeSelector = this.container.find('.drp-calendar.right .calendar-time');
        if (timeSelector.html() != '') {
          selected.hour(!isNaN(selected.hour()) ? selected.hour() : timeSelector.find('.hourselect option:selected').val());
          selected.minute(!isNaN(selected.minute()) ? selected.minute() : timeSelector.find('.minuteselect option:selected').val());
          selected.second(!isNaN(selected.second()) ? selected.second() : timeSelector.find('.secondselect option:selected').val());

          if (!this.timePicker24Hour) {
            const ampm = timeSelector.find('.ampmselect option:selected').val();
            if (ampm === 'PM' && selected.hour() < 12) selected.hour(selected.hour() + 12);
            if (ampm === 'AM' && selected.hour() === 12) selected.hour(0);
          }
        }

        if (selected.isBefore(this.startDate)) selected = this.startDate.clone();

        if (maxDate && selected.isAfter(maxDate)) selected = maxDate.clone();
      }

      //
      // hours
      //

      html = '<select class="hourselect">';

      const start = this.timePicker24Hour ? 0 : 1;
      const end = this.timePicker24Hour ? 23 : 12;

      for (var i = start; i <= end; i++) {
        let i_in_24 = i;
        if (!this.timePicker24Hour) i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

        var time = selected.clone().hour(i_in_24);
        var disabled = false;
        if (minDate && time.minute(59).isBefore(minDate)) disabled = true;
        if (maxDate && time.minute(0).isAfter(maxDate)) disabled = true;

        if (i_in_24 == selected.hour() && !disabled) {
          html += `<option value="${i}" selected="selected">${i}</option>`;
        } else if (disabled) {
          html += `<option value="${i}" disabled="disabled" class="disabled">${i}</option>`;
        } else {
          html += `<option value="${i}">${i}</option>`;
        }
      }

      html += '</select> ';

      //
      // minutes
      //

      html += ': <select class="minuteselect">';

      for (var i = 0; i < 60; i += this.timePickerIncrement) {
        var padded = i < 10 ? `0${i}` : i;
        var time = selected.clone().minute(i);

        var disabled = false;
        if (minDate && time.second(59).isBefore(minDate)) disabled = true;
        if (maxDate && time.second(0).isAfter(maxDate)) disabled = true;

        if (selected.minute() == i && !disabled) {
          html += `<option value="${i}" selected="selected">${padded}</option>`;
        } else if (disabled) {
          html += `<option value="${i}" disabled="disabled" class="disabled">${padded}</option>`;
        } else {
          html += `<option value="${i}">${padded}</option>`;
        }
      }

      html += '</select> ';

      //
      // seconds
      //

      if (this.timePickerSeconds) {
        html += ': <select class="secondselect">';

        for (var i = 0; i < 60; i++) {
          var padded = i < 10 ? `0${i}` : i;
          var time = selected.clone().second(i);

          var disabled = false;
          if (minDate && time.isBefore(minDate)) disabled = true;
          if (maxDate && time.isAfter(maxDate)) disabled = true;

          if (selected.second() == i && !disabled) {
            html += `<option value="${i}" selected="selected">${padded}</option>`;
          } else if (disabled) {
            html += `<option value="${i}" disabled="disabled" class="disabled">${padded}</option>`;
          } else {
            html += `<option value="${i}">${padded}</option>`;
          }
        }

        html += '</select> ';
      }

      //
      // AM/PM
      //

      if (!this.timePicker24Hour) {
        html += '<select class="ampmselect">';

        let am_html = '';
        let pm_html = '';

        if (minDate && selected.clone().hour(12).minute(0).second(0)
          .isBefore(minDate)) am_html = ' disabled="disabled" class="disabled"';

        if (maxDate && selected.clone().hour(0).minute(0).second(0)
          .isAfter(maxDate)) pm_html = ' disabled="disabled" class="disabled"';

        if (selected.hour() >= 12) {
          html += `<option value="AM"${am_html}>AM</option><option value="PM" selected="selected"${pm_html}>PM</option>`;
        } else {
          html += `<option value="AM" selected="selected"${am_html}>AM</option><option value="PM"${pm_html}>PM</option>`;
        }

        html += '</select>';
      }

      this.container.find(`.drp-calendar.${side} .calendar-time`).html(html);
    },

    updateFormInputs() {
      if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
        this.container.find('button.applyBtn').removeAttr('disabled');
      } else {
        this.container.find('button.applyBtn').attr('disabled', 'disabled');
      }
    },

    move() {
      let parentOffset = { top: 0, left: 0 };
      let containerTop;
      let parentRightEdge = $(window).width();
      if (!this.parentEl.is('body')) {
        parentOffset = {
          top: this.parentEl.offset().top - this.parentEl.scrollTop(),
          left: this.parentEl.offset().left - this.parentEl.scrollLeft(),
        };
        parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
      }

      if (this.drops == 'up') containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
      else containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
      this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('drop-up');

      if (this.opens == 'left') {
        this.container.css({
          top: containerTop,
          right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
          left: 'auto',
        });
        if (this.container.offset().left < 0) {
          this.container.css({
            right: 'auto',
            left: 9,
          });
        }
      } else if (this.opens == 'center') {
        this.container.css({
          top: containerTop,
          left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
          right: 'auto',
        });
        if (this.container.offset().left < 0) {
          this.container.css({
            right: 'auto',
            left: 9,
          });
        }
      } else {
        this.container.css({
          top: containerTop,
          left: this.element.offset().left - parentOffset.left,
          right: 'auto',
        });
        if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
          this.container.css({
            left: 'auto',
            right: 0,
          });
        }
      }
    },

    show(e) {
      if (this.isShowing) return;

      // Create a click proxy that is private to this instance of datepicker, for unbinding
      this._outsideClickProxy = $.proxy(function (e) { this.outsideClick(e); }, this);

      // Bind global datepicker mousedown for hiding and
      $(document)
        .on('mousedown.daterangepicker', this._outsideClickProxy)
      // also support mobile devices
        .on('touchend.daterangepicker', this._outsideClickProxy)
      // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
        .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
      // and also close when focus changes to outside the picker (eg. tabbing between controls)
        .on('focusin.daterangepicker', this._outsideClickProxy);

      // Reposition the picker if the window is resized while it's open
      $(window).on('resize.daterangepicker', $.proxy(function (e) { this.move(e); }, this));

      this.oldStartDate = this.startDate.clone();
      this.oldEndDate = this.endDate.clone();
      this.previousRightTime = this.endDate.clone();

      this.updateView();
      this.container.show();
      this.move();
      this.element.trigger('show.daterangepicker', this);
      this.isShowing = true;
    },

    hide(e) {
      if (!this.isShowing) return;

      // incomplete date selection, revert to last values
      if (!this.endDate) {
        this.startDate = this.oldStartDate.clone();
        this.endDate = this.oldEndDate.clone();
      }

      // if a new date range was selected, invoke the user callback function
      if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate)) this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel);

      // if picker is attached to a text input, update it
      this.updateElement();

      $(document).off('.daterangepicker');
      $(window).off('.daterangepicker');
      this.container.hide();
      this.element.trigger('hide.daterangepicker', this);
      this.isShowing = false;
    },

    toggle(e) {
      if (this.isShowing) {
        this.hide();
      } else {
        this.show();
      }
    },

    outsideClick(e) {
      const target = $(e.target);
      // if the page is clicked anywhere except within the daterangerpicker/button
      // itself then call this.hide()
      if (
      // ie modal dialog fix
        e.type == 'focusin'
          || target.closest(this.element).length
          || target.closest(this.container).length
          || target.closest('.calendar-table').length
      ) return;
      this.hide();
      this.element.trigger('outsideClick.daterangepicker', this);
    },

    showCalendars() {
      this.container.addClass('show-calendar');
      this.move();
      this.element.trigger('showCalendar.daterangepicker', this);
    },

    hideCalendars() {
      this.container.removeClass('show-calendar');
      this.element.trigger('hideCalendar.daterangepicker', this);
    },

    clickRange(e) {
      const label = e.target.getAttribute('data-range-key');
      this.chosenLabel = label;
      if (label == this.locale.customRangeLabel) {
        this.showCalendars();
      } else {
        const dates = this.ranges[label];
        this.startDate = dates[0];
        this.endDate = dates[1];

        if (!this.timePicker) {
          this.startDate.startOf('day');
          this.endDate.endOf('day');
        }

        if (!this.alwaysShowCalendars) this.hideCalendars();
        this.clickApply();
        $(`#${this.startSpanId}`).html(this.chosenLabel);
      }
    },

    clickPrev(e) {
      const cal = $(e.target).parents('.drp-calendar');
      if (cal.hasClass('left')) {
        this.leftCalendar.month.subtract(1, 'month');
        if (this.linkedCalendars) this.rightCalendar.month.subtract(1, 'month');
      } else {
        this.rightCalendar.month.subtract(1, 'month');
      }
      this.updateCalendars();
    },

    clickNext(e) {
      const cal = $(e.target).parents('.drp-calendar');
      if (cal.hasClass('left')) {
        this.leftCalendar.month.add(1, 'month');
      } else {
        this.rightCalendar.month.add(1, 'month');
        if (this.linkedCalendars) this.leftCalendar.month.add(1, 'month');
      }
      this.updateCalendars();
    },

    hoverDate(e) {
      // ignore dates that can't be selected
      if (!$(e.target).hasClass('available')) return;

      const title = $(e.target).attr('data-title');
      const row = title.substr(1, 1);
      const col = title.substr(3, 1);
      const cal = $(e.target).parents('.drp-calendar');
      const date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

      // highlight the dates between the start date and the date being hovered as a potential end date
      const { leftCalendar } = this;
      const { rightCalendar } = this;
      const { startDate } = this;
      if (!this.endDate) {
        this.container.find('.drp-calendar tbody td').each((index, el) => {
          // skip week numbers, only look at dates
          if ($(el).hasClass('week')) return;

          const title = $(el).attr('data-title');
          const row = title.substr(1, 1);
          const col = title.substr(3, 1);
          const cal = $(el).parents('.drp-calendar');
          const dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

          if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
            $(el).addClass('in-range');
          } else {
            $(el).removeClass('in-range');
          }
        });
      }
    },

    clickDate(e) {
      if (!$(e.target).hasClass('available')) return;

      const title = $(e.target).attr('data-title');
      const row = title.substr(1, 1);
      const col = title.substr(3, 1);
      const cal = $(e.target).parents('.drp-calendar');
      let date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

      //
      // this function needs to do a few things:
      // * alternate between selecting a start and end date for the range,
      // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
      // * if autoapply is enabled, and an end date was chosen, apply the selection
      // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
      // * if one of the inputs above the calendars was focused, cancel that manual input
      //

      if (this.endDate || date.isBefore(this.startDate, 'day')) { // picking start
        if (this.timePicker) {
          var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
          if (!this.timePicker24Hour) {
            var ampm = this.container.find('.left .ampmselect').val();
            if (ampm === 'PM' && hour < 12) hour += 12;
            if (ampm === 'AM' && hour === 12) hour = 0;
          }
          var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
          // if (isNaN(minute)) {
          //   minute = parseInt(this.container.find('.left .minuteselect option:last').val(), 10);
          // }
          var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
          date = date.clone().hour(hour).minute(minute).second(second);
        }
        this.endDate = null;
        this.setStartDate(date.clone());
      } else if (!this.endDate && date.isBefore(this.startDate)) {
        // special case: clicking the same date for start/end,
        // but the time of the end date is before the start date
        this.setEndDate(this.startDate.clone());
      } else { // picking end
        if (this.timePicker) {
          var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
          if (!this.timePicker24Hour) {
            var ampm = this.container.find('.right .ampmselect').val();
            if (ampm === 'PM' && hour < 12) hour += 12;
            if (ampm === 'AM' && hour === 12) hour = 0;
          }
          var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
          // if (isNaN(minute)) {
          //   minute = parseInt(this.container.find('.right .minuteselect option:last').val(), 10);
          // }
          var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
          date = date.clone().hour(hour).minute(minute).second(second);
        }
        this.setEndDate(date.clone());
        if (this.autoApply) {
          this.calculateChosenLabel();
          this.clickApply();
        }
      }

      if (this.singleDatePicker) {
        this.setEndDate(this.startDate);
        if (!this.timePicker) this.clickApply();
      }

      this.updateView();

      // This is to cancel the blur event handler if the mouse was in one of the inputs
      e.stopPropagation();
      this.element.trigger('customDateRangeSet.daterangepicker', this);
    },

    calculateChosenLabel() {
      let customRange = true;
      let i = 0;
      for (const range in this.ranges) {
        if (this.timePicker) {
          const format = this.timePickerSeconds ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm';
          // ignore times when comparing dates if time picker seconds is not enabled
          if (this.startDate.format(format) == this.ranges[range][0].format(format) && this.endDate.format(format) == this.ranges[range][1].format(format)) {
            customRange = false;
            this.chosenLabel = this.container.find(`.ranges li:eq(${i})`).addClass('active').attr('data-range-key');
            break;
          }
        } else {
          // ignore times when comparing dates if time picker is not enabled
          if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
            customRange = false;
            this.chosenLabel = this.container.find(`.ranges li:eq(${i})`).addClass('active').attr('data-range-key');
            break;
          }
        }
        i++;
      }
      if (customRange) {
        if (this.showCustomRangeLabel) {
          this.chosenLabel = this.container.find('.ranges li:last').addClass('active').attr('data-range-key');
        } else {
          this.chosenLabel = null;
        }
        this.showCalendars();
      }
      // hhlee - 디자인에서 새로운 템플릿으로 변경함
      this.container.find('.daterangepicker-range-txt').html(`( ${this.chosenLabel} )`);
      $(`#${this.startSpanId}`).html(this.chosenLabel);
    },

    clickApply(e) {
      this.hide();
      /* apply 시에는 전부 적용이다. */
      $(`#${this.startSpanId}`).show();
      this.autoUpdateInput = true;
      /* */
      this.element.trigger('apply.daterangepicker', this);
    },

    clickCancel(e) {
      this.startDate = this.oldStartDate;
      this.endDate = this.oldEndDate;
      this.hide();
      this.element.trigger('cancel.daterangepicker', this);
    },

    monthOrYearChanged(e) {
      const isLeft = $(e.target).closest('.drp-calendar').hasClass('left');
      const leftOrRight = isLeft ? 'left' : 'right';
      const cal = this.container.find(`.drp-calendar.${leftOrRight}`);

      // Month must be Number for new dayjs versions
      let month = parseInt(cal.find('.monthselect').val(), 10);
      let year = cal.find('.yearselect').val();

      if (!isLeft) {
        if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
          month = this.startDate.month();
          year = this.startDate.year();
        }
      }

      if (this.minDate) {
        if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
          month = this.minDate.month();
          year = this.minDate.year();
        }
      }

      if (this.maxDate) {
        if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
          month = this.maxDate.month();
          year = this.maxDate.year();
        }
      }

      if (isLeft) {
        this.leftCalendar.month.month(month).year(year);
        if (this.linkedCalendars) this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
      } else {
        this.rightCalendar.month.month(month).year(year);
        if (this.linkedCalendars) this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
      }
      this.updateCalendars();
    },

    timeChanged(e) {
      const cal = $(e.target).closest('.drp-calendar');
      const isLeft = cal.hasClass('left');

      let hour = parseInt(cal.find('.hourselect').val(), 10);
      const minute = parseInt(cal.find('.minuteselect').val(), 10);
      // if (isNaN(minute)) {
      //   minute = parseInt(cal.find('.minuteselect option:last').val(), 10);
      // }
      const second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

      if (!this.timePicker24Hour) {
        const ampm = cal.find('.ampmselect').val();
        if (ampm === 'PM' && hour < 12) hour += 12;
        if (ampm === 'AM' && hour === 12) hour = 0;
      }

      if (isLeft) {
        const start = this.startDate.clone();
        start.hour(hour);
        start.minute(minute);
        start.second(second);
        this.setStartDate(start);
        if (this.singleDatePicker) {
          this.endDate = this.startDate.clone();
        } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
          this.setEndDate(start.clone());
        }
      } else if (this.endDate) {
        const end = this.endDate.clone();
        end.hour(hour);
        end.minute(minute);
        end.second(second);
        this.setEndDate(end);
      }

      // update the calendars so all clickable dates reflect the new time component
      this.updateCalendars();

      // update the form inputs above the calendars with the new time
      this.updateFormInputs();

      // re-render the time pickers because changing one selection can affect what's enabled in another
      this.renderTimePicker('left');
      this.renderTimePicker('right');
    },

    elementChanged() {
      if (!this.element.is('input')) return;
      if (!this.element.val().length) return;

      const dateString = this.element.val().split(this.locale.separator);
      let start = null;
      let end = null;

      if (dateString.length === 2) {
        start = dayjs(dateString[0], this.locale.format);
        end = dayjs(dateString[1], this.locale.format);
      }

      if (this.singleDatePicker || start === null || end === null) {
        start = dayjs(this.element.val(), this.locale.format);
        end = start;
      }

      if (!start.isValid() || !end.isValid()) return;

      this.setStartDate(start);
      this.setEndDate(end);
      this.updateView();
    },

    keydown(e) {
      // hide on tab or enter
      if ((e.keyCode === 9) || (e.keyCode === 13)) {
        this.hide();
      }

      // hide on esc and prevent propagation
      if (e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();

        this.hide();
      }
    },

    updateElement() {
      if (this.element.is('input') && this.autoUpdateInput) {
        let newValue = this.startDate.format(this.locale.format);
        if (!this.singleDatePicker) {
          newValue += this.locale.separator + this.endDate.format(this.locale.format);
        }
        if (newValue !== this.element.val()) {
          this.element.val(newValue).trigger('change');
        }
      } else {
            	this.element.val('').trigger('change');
      }
    },

    remove() {
      this.container.remove();
      this.element.off('.daterangepicker');
      this.element.removeData();
    },

  };

  $.fn.daterangepicker = function (options, callback) {
    	if (options.calOption != null && options.calOption == 'week') $.fn.daterangepicker.defaultOptions.ranges = $.fn.daterangepicker.defaultOptions.weekRanges;
    	if (options.calOption != null && options.calOption == 'month') $.fn.daterangepicker.defaultOptions.ranges = $.fn.daterangepicker.defaultOptions.monthRanges;
    	if (options.calOption != null && options.calOption == 'default') $.fn.daterangepicker.defaultOptions.ranges = $.fn.daterangepicker.defaultOptions.defaultRanges;
    const implementOptions = $.extend(true, {}, $.fn.daterangepicker.defaultOptions, options);
    this.each(function () {
      const el = $(this);
      if (el.data('daterangepicker')) el.data('daterangepicker').remove();
      el.data('daterangepicker', new DateRangePicker(el, implementOptions, callback));
    });
    return this;
  };

  return DateRangePicker;
}));
