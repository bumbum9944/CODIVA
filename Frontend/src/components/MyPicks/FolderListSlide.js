// import { React } from "react";
// import CloseIcon from "@material-ui/icons/Close";

// function FolderListSlide() {
//   function closeSlideMenu() {
//     document.querySelector("body").classList.remove("no-scroll");
//     document.querySelector("#dimmed").remove();
//     document.querySelector(".slide-menu-container").classList.remove("on");
//   }

//   return (
//     <div className="folder-slide-list-container">
//       <CloseIcon
//         className="slide-menu-close-btn"
//         style={{
//           position: "absolute",
//           left: 0,
//           paddingTop: "1vh",
//           paddingRight: "3vw",
//           fontSize: "10vw"
//         }}
//         onClick={closeSlideMenu}
//       />
//       <div
//         className="slide-menu-title"
//         onClick={() => {
//           history.push("/");
//           closeSlideMenu();
//         }}
//       >
//         CODIBA
//       </div>
//       <ul className="slide-menu-list">
//         <li
//           className="slide-menu-item"
//           onClick={() => {
//             history.push("/top-codies");
//             closeSlideMenu();
//           }}
//         >
//           <BsHeartFill className="slide-menu-icon" />
//           TOP CODIES
//         </li>
//         <li
//           className="slide-menu-item"
//           onClick={() => {
//             history.push("/my-picks");
//             closeSlideMenu();
//           }}
//         >
//           <BsBookmarksFill className="slide-menu-icon" />
//           MY PICKS
//         </li>
//       </ul>
//       <div className="slide-menu-footer">
//         <div className="slide-menu-white-line"></div>
//         {footerButton}
//         {/* <div className="slide-menu-home-btn">SIGN IN</div>
//         <div className="slide-menu-home-btn">SIGN UP</div> */}
//       </div>
//     </div>
//   );
// }

// export default FolderListSlide;
