// import React from 'react'

// export const metadata = {
//   title: '개인정보 처리방침',
// }

// export default function PrivacyPolicyPage() {
//   return (
//     <div className="bg-gray-50 pb-12">
//       <div className="container mx-auto px-4">
//         <div className="max-w-3xl mx-auto shadow-xl">
//           <div className="prose lg:prose-xl p-8 bg-white rounded-xl">
//             <h1 className="text-4xl font-extrabold text-center mb-8">
//               개인정보 처리방침
//             </h1>
//             <p className="mb-6">
//               이 처리방침은 “Food Expenses Master” 앱(PWA 및 Android 네이티브
//               앱)에서 수집·이용·보관·파기되는 개인정보의 처리 및 이용자의 권리
//               보호에 대해 설명합니다.
//             </p>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">1. 총칙</h2>
//             <p>
//               본 방침은 웹(PWA)과 Android 앱 양쪽에 모두 적용되며, 관련 법령에
//               따라 변경 시 공지합니다.
//             </p>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">
//               2. 개인정보의 수집 항목
//             </h2>
//             <ul className="list-disc list-inside space-y-2">
//               <li>
//                 <strong>필수 수집 정보</strong>: 이메일 주소, Firebase Auth UID,
//                 IP 주소, 디바이스 정보(OS, 브라우저)
//               </li>
//               <li>
//                 <strong>선택 수집 정보</strong>: 푸시 알림 설정, 위치 정보(선택
//                 시)
//               </li>
//               <li>
//                 <strong>자동 생성 정보</strong>: 이용 기록(페이지 방문, 서비스
//                 로그)
//               </li>
//             </ul>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">
//               3. 수집·이용 목적
//             </h2>
//             <ul className="list-disc list-inside space-y-2">
//               <li>회원 관리(인증·가입·로그인 유지)</li>
//               <li>서비스 제공 및 개선(맞춤형 기능, 통계 분석)</li>
//               <li>푸시 알림(식비 알림, 공지 사항)</li>
//               <li>법적 의무 이행(분쟁 해결, 부정 이용 방지)</li>
//             </ul>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">
//               4. 개인정보 보유·이용 기간
//             </h2>
//             <ul className="list-disc list-inside space-y-2">
//               <li>회원 탈퇴 시: 즉시 파기</li>
//               <li>로그 정보: 최대 1년 보관 후 삭제</li>
//               <li>법령 의무 보존: 전자상거래법 등 법정 의무 보존 기간 준수</li>
//             </ul>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">
//               5. 개인정보 제3자 제공
//             </h2>
//             <p>
//               Firebase(구글), 애널리틱스·Crashlytics 등 제휴사에 한해 서비스
//               운영·분석 목적으로 제공합니다.
//             </p>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">
//               6. 개인정보 처리 위탁
//             </h2>
//             <p>
//               호스팅, 인증, 푸시 등 업무를 위해 Firebase Hosting, Firebase Auth,
//               Firebase Cloud Messaging에 위탁합니다.
//             </p>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">
//               7. 이용자 권리 및 행사 방법
//             </h2>
//             <p>
//               이용자는 개인정보 열람·정정·삭제·이용정지 요청 권리를 가지며, 앱
//               설정화면 또는 이메일(hwanbin@infludeo.com)로 문의하시면 지체 없이
//               조치합니다.
//             </p>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">
//               8. 개인정보 안전성 확보 조치
//             </h2>
//             <ul className="list-disc list-inside space-y-2">
//               <li>관리적 조치: 정책 수립·직원 교육</li>
//               <li>기술적 조치: HTTPS 암호화, Firebase 보안 규칙</li>
//               <li>물리적 조치: 서버 접근 통제</li>
//             </ul>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">
//               9. 쿠키 운용 정책
//             </h2>
//             <p>
//               쿠키를 사용해 접속 빈도·이용 기록을 파악하며, 브라우저 설정에서
//               거부 가능하지만 서비스 이용에 제약이 있을 수 있습니다.
//             </p>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">
//               10. 만 14세 미만 아동의 개인정보
//             </h2>
//             <p>
//               만 14세 미만 아동의 개인정보는 법정대리인 동의 없이는 수집하지
//               않습니다.
//             </p>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">
//               11. 처리방침 변경
//             </h2>
//             <p>
//               시행일: 2025-06-12
//               <br />
//               변경 시 앱 공지 및 본 페이지 상단에 변경일자를 기재합니다.
//             </p>

//             <h2 className="text-2xl font-semibold mt-10 mb-4">12. 문의처</h2>
//             <address className="not-italic mt-6 space-y-1">
//               <p>책임자: 유환빈</p>
//               <p>
//                 이메일:{' '}
//                 <a
//                   href="mailto:hwanbin@infludeo.com"
//                   className="text-blue-600 underline"
//                 >
//                   hwanbin@infludeo.com
//                 </a>
//               </p>
//               <p>전화: 02-1234-5678</p>
//             </address>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
