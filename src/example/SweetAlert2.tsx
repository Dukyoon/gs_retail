//기본 예제용
import React from 'react';
import Swal from 'sweetalert2';
import 'animate.css'; // 에니메이션 효과로 인하여 npm으로 설치 후 추가

//스위트알럿2 : https://sweetalert2.github.io/#examples
 
const defaultSwal = () => {
    Swal.fire('완전 아무것도 설정 안한 상태입니다.');
}

const confirmSwal = () => {
    Swal.fire({
        icon: 'warning',
        title: '광고를 비활성화 하시겠습니까',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: '저장',
        denyButtonText: '취소',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
}

const positionSwal = () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '광고 등록 완료되었습니다.',
        showConfirmButton: false,
        timer: 1500
      })
}
const footerSwal = () => {
    Swal.fire({
        icon: 'error',
        title: '대출 금리가 높아요 어떡하죠?',
        text: '로또 당첨 되세요.',
        footer: '<a href="">어디 로또점에서 사야할까요?</a>'
      })
}

const animateSwal = () => {
    Swal.fire({
        icon: 'info',
        title: '이 기능은 애니메이트.css 추가가 필요합니다.',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

const bigSwal = () => {
    Swal.fire({
        icon: 'question',
        width: '1200',
        title: '빅 사이즈 알럿',
        text: '빅빅빅 사이즈 알럿 ~ ',
    })
}
const SweetAlert2 = () => {
    return (
        <>
        
        <div className="content-body">
            <section className="wrap-section wrap-tbl">
                <div className="box-header">
                    <div className="box-tit">
                        <h2 className="fz-20 fc-1 fw-bold">스위트알럿</h2>
                    </div>
                    <div className="box-option">
                    <button type="button" className="btn btn-primary" onClick={defaultSwal}>완전 기본</button>
                    <button type="button" className="btn btn-primary-outline" onClick={confirmSwal}>컨펌</button>
                    <button type="button" className="btn btn-primary" onClick={footerSwal}>푸터 추가</button>
                    <button type="button" className="btn btn-primary-outline" onClick={positionSwal}>노출 위치 변경</button>
                    <button type="button" className="btn btn-primary" onClick={animateSwal}>노출 시 애니메이션 추가</button>
                    <button type="button" className="btn btn-primary-outline" onClick={bigSwal}>대왕 사이즈</button>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}


export default SweetAlert2;
