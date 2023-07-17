import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import {EffectCoverflow, Navigation, Pagination} from 'swiper/modules';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

const CustomSwiper = (props) => {

    return (
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={1}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: true,
                }}
                pagination={{el: '.swiper-pagination', clickable: true}}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="hidden lg:block"
            >
                {
                    React.Children.map(props.children, (child, index) => {
                        return (
                            <SwiperSlide key={index}>
                                {child}
                            </SwiperSlide>
                        );
                    })
                }

                <div className="flex items-center justify-between px-[8rem] absolute h-full top-0 z-10">
                    <div
                        className="swiper-button-prev flex flex-col justify-center items-center flex-shrink-0 text-white w-[3rem] h-[3rem] rounded-[5rem] border-[1px] border-main-purple bg-main-purple hover:text-main-purple hover:bg-transparent">
                        <FontAwesomeIcon icon={faAngleLeft}/>
                    </div>
                </div>
                <div className="flex items-center justify-between px-[8rem] absolute h-full top-0 right-0 z-10">
                    <div
                        className="swiper-button-next flex flex-col justify-center items-center flex-shrink-0 text-white w-[3rem] h-[3rem] rounded-[5rem] border-[1px] border-main-purple bg-main-purple hover:text-main-purple hover:bg-transparent">
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </div>
                </div>

            </Swiper>
    );

}

export default CustomSwiper;
