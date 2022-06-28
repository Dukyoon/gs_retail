// alertify.defaults.notifier.delay = 2;
// alertify.defaults.glossary.ok = '확인';
// alertify.defaults.glossary.cancel = '취소';
// $.fn.dialog.defaults.closed = true;
$.fn.dialog.defaults.modal = true;
$.fn.dialog.defaults.shadow = false;
$.fn.dialog.defaults.onBeforeOpen = function() {
  $(this).show().dialog('center');
}

$.fn.select2.defaults.defaults.language.noResults = function () {
  return '선택 결과가 없습니다.';
};
$.fn.daterangepicker.defaultOptions = {};
$.fn.daterangepicker.defaultOptions.linkedCalendars = false;
$.fn.daterangepicker.defaultOptions.alwaysShowCalendars = true;
$.fn.daterangepicker.defaultOptions.buttonClasses = 'btn';
$.fn.daterangepicker.defaultOptions.applyButtonClasses = 'btn-primary';
$.fn.daterangepicker.defaultOptions.cancelClass = 'btn-secondary-outline';
$.fn.daterangepicker.defaultOptions.locale = {
  direction: 'ltr',
  format: 'YY-MM-DD',
  paramFormat: 'YYYYMMDD',
  separator: ' ~ ',
  applyLabel: '적용',
  cancelLabel: '취소',
  weekLabel: 'W',
  customRangeLabel: '사용자 설정',
  daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
  monthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  firstDay: dayjs().localeData().firstDayOfWeek(),
};
$.fn.daterangepicker.defaultOptions.template = '<div class="daterangepicker">'
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
    + '<span class="daterangepicker-range-txt">( 최근 7일 )</span>'
    + '<span class="drp-selected"></span>'
    + '<button class="cancelBtn" type="button"></button>'
    + '<button class="applyBtn" disabled="disabled" type="button"></button>'
    + '</div>'
    + '</div>';
