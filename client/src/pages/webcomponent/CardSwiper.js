// import React from "react";
// import {Swiper, SwiperSlide} from 'swiper/react';

// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

// import {EffectCoverflow, Navigation, Pagination} from 'swiper/modules';

// import {Card, CardBody, Typography} from "@material-tailwind/react";
// import placeholder from "../../assets/images/placeholder-1.png";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faAngleLeft, faAngleRight, faStar} from "@fortawesome/free-solid-svg-icons";
// import CustomButton from "./CustomButton";

// const CardSwiper = () => {

//     const Items = () => {
//         return (
//             <Card color="white" shadow={true}
//                   className="justify-center overflow-hidden text-center gap-[1.5rem] drop-shadow-2xl my-[2rem]">
//                 <CardBody className="flex flex-row justify-between p-[1.5rem]">
//                     <img src={placeholder} alt="placeholder"
//                          className="w-[200px] flex-shrink-0 self-stretch rounded-[0.5rem]"/>
//                     <div className="flex flex-col items-start self-stretch gap-[1rem] p-[1.5rem]">
//                         <div className="flex justify-between items-center w-full">
//                             <Typography className="text-[1.5rem] font-[700] text-main-purple uppercase tracking-[2px]">
//                                 Title
//                             </Typography>
//                             <div className="flex items-center gap-[5px] p-[5px] rounded-[1.25rem] bg-gray-900">
//                                 <FontAwesomeIcon icon={faStar} className="text-yellow-700"/>
//                                 <Typography
//                                     className="text-[0.75rem] font-[400] tracking-[0.2px] leading-[1rem] text-white">4.9</Typography>
//                             </div>
//                         </div>
//                         <Typography
//                             className="text-[1rem] font-[400] text-light-purple tracking-[0.2px] leading-[1.5rem]">
//                             Owner
//                         </Typography>
//                         <Typography className="w-[14rem] text-start">
//                             &quot;I found solution to all my design needs from Creative Tim. I use
//                             them as a freelancer in my hobby projects for fun! And its really
//                             affordable, very humble guys !!!&quot;
//                         </Typography>
//                         <CustomButton
//                             type="button"
//                             variant="clear"
//                             icon="next"
//                             className="!rounded-[2.5rem]"
//                         >
//                             Read More
//                         </CustomButton>
//                     </div>
//                 </CardBody>
//             </Card>
//         )
//     }

//     return (
//         <Swiper
//             effect={'coverflow'}
//             grabCursor={true}
//             centeredSlides={true}
//             slidesPerView={'auto'}
//             initialSlide={1}
//             coverflowEffect={{
//                 rotate: 0,
//                 stretch: 0,
//                 depth: 100,
//                 modifier: 2,
//                 slideShadows: true,
//             }}
//             pagination={{el: '.swiper-pagination', clickable: true}}
//             navigation={{
//                 nextEl: '.swiper-button-next',
//                 prevEl: '.swiper-button-prev',
//                 clickable: true,
//             }}
//             modules={[EffectCoverflow, Pagination, Navigation]}
//         >
//             <SwiperSlide>
//                 <Items/>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <Items/>
//             </SwiperSlide>
//             <SwiperSlide>
//                 <Items/>
//             </SwiperSlide>

//             <div className="flex items-center justify-between px-[8rem] absolute h-full top-0 z-10">
//                 <div
//                     className="swiper-button-prev flex flex-col justify-center items-center flex-shrink-0 text-white w-[3rem] h-[3rem] rounded-[5rem] border-[1px] border-main-purple bg-main-purple hover:text-main-purple hover:bg-transparent">
//                     <FontAwesomeIcon icon={faAngleLeft}/>
//                 </div>
//             </div>
//             <div className="flex items-center justify-between px-[8rem] absolute h-full top-0 right-0 z-10">
//                 <div
//                     className="swiper-button-next flex flex-col justify-center items-center flex-shrink-0 text-white w-[3rem] h-[3rem] rounded-[5rem] border-[1px] border-main-purple bg-main-purple hover:text-main-purple hover:bg-transparent">
//                     <FontAwesomeIcon icon={faAngleRight}/>
//                 </div>
//             </div>

//         </Swiper>
//     );

// }

// export default CardSwiper;

// // import React from "react";
// // import {Swiper, SwiperSlide} from 'swiper/react';
// //
// // import 'swiper/css';
// // import 'swiper/css/effect-coverflow';
// // import 'swiper/css/pagination';
// //
// // import {EffectCoverflow, Pagination} from 'swiper/modules';
// //
// // import {Card, CardBody, Typography} from "@material-tailwind/react";
// // import placeholder from "../../assets/images/placeholder-1.png";
// // import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// // import {faStar} from "@fortawesome/free-solid-svg-icons";
// // import CustomButton from "./CustomButton";
// //
// // const CardSwiper = () => {
// //
// //     const Items = () => {
// //         return (
// //             <Card color="white" shadow={true}
// //                   className="justify-center overflow-hidden text-center gap-[1.5rem] drop-shadow-2xl my-[2rem]">
// //                 <CardBody className="flex flex-row justify-between p-[1.5rem]">
// //                     <img src={placeholder} alt="placeholder"
// //                          className="w-[200px] flex-shrink-0 self-stretch rounded-[0.5rem]"/>
// //                     <div className="flex flex-col items-start self-stretch gap-[1rem] p-[1.5rem]">
// //                         <div className="flex justify-between items-center w-full">
// //                             <Typography className="text-[1.5rem] font-[700] text-main-purple uppercase tracking-[2px]">
// //                                 Title
// //                             </Typography>
// //                             <div className="flex items-center gap-[5px] p-[5px] rounded-[1.25rem] bg-gray-900">
// //                                 <FontAwesomeIcon icon={faStar} className="text-yellow-700"/>
// //                                 <Typography
// //                                     className="text-[0.75rem] font-[400] tracking-[0.2px] leading-[1rem] text-white">4.9</Typography>
// //                             </div>
// //                         </div>
// //                         <Typography
// //                             className="text-[1rem] font-[400] text-light-purple tracking-[0.2px] leading-[1.5rem]">
// //                             Owner
// //                         </Typography>
// //                         <Typography className="w-[14rem] text-start">
// //                             &quot;I found solution to all my design needs from Creative Tim. I use
// //                             them as a freelancer in my hobby projects for fun! And its really
// //                             affordable, very humble guys !!!&quot;
// //                         </Typography>
// //                         <CustomButton
// //                             type="button"
// //                             variant="clear"
// //                             icon="next"
// //                             className="!rounded-[2.5rem]"
// //                         >
// //                             Read More
// //                         </CustomButton>
// //                     </div>
// //                 </CardBody>
// //             </Card>
// //         )
// //     }
// //
// //     return (
// //         <Swiper
// //             effect={'coverflow'}
// //             grabCursor={true}
// //             centeredSlides={true}
// //             slidesPerView={'auto'}
// //             coverflowEffect={{
// //                 rotate: 0,
// //                 stretch: 0,
// //                 depth: 100,
// //                 modifier: 2,
// //                 slideShadows: true,
// //             }}
// //             modules={[EffectCoverflow, Pagination]}
// //         >
// //             <SwiperSlide>
// //                 <Items/>
// //             </SwiperSlide>
// //             <SwiperSlide>
// //                 <Items/>
// //             </SwiperSlide>
// //             <SwiperSlide>
// //                 <Items/>
// //             </SwiperSlide>
// //
// //         </Swiper>
// //     );
// //
// // }
// //
// // export default CardSwiper