import { React, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate, useLocation } from "react-router-dom";
import { bookHotel } from "../services/BookingService";
import moment from 'moment';
import ReactDOM from 'react-dom';
import {useFormik} from 'formik';
import Header from '../components/Header';

const validateBookingForm = bookData => {
    const errors = {};
  
    if (!bookData.fName) {
      errors.fName = 'Please Enter First Name';
    } else if (bookData.fName.length > 20) {
      errors.fName = 'Name cannot exceed 20 characters';
    }

    if (!bookData.lName) {
        errors.lName = 'Please Enter Last Name';
      } else if (bookData.lName.length > 20) {
        errors.Name = 'Name cannot exceed 20 characters';
      }
  
    if (!bookData.address) {
      errors.Location = 'Please Enter the Location';
    } 
  
    if (!bookData.email) {
      errors.email = 'Please Enter Email ID';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(bookData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!bookData.phone) {
        errors.phone = 'Please Enter your phone number';
      } else if (bookData.phone.length > 10 || bookData.phone.length < 10) {
        errors.Name = 'Invalid phone number';
    }
    if (!bookData.guest) {
        errors.guest = 'Please Enter the number of guest';
    }
    if (!bookData.room) {
        errors.room = 'Please Enter the number of rooms needed';
      }  
  
    return errors;
};

const HotelBookingForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const publishableKey = 'pk_test_51LtEyLIFsTvZxqKPuarxbURt3dUsDF94y7jgNzTgk71Ccp5IEywhhyyXoNiG4tfz0AkMttO41ZPK4l6KbhVTlu5U00Mw1ynYSm';
    const [hotelData, sethotelData] = useState(location.state.hotelData);
    const [totalPrice, setTotalPrice] = useState(hotelData.roomprice);
    const [bookedDays, setBookedDays] = useState(1);
    const [inputs, setInputs] = useState({});
    const additionalCharge = hotelData.roomprice * 0.10;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name == 'room') {
            setTotalPrice(additionalCharge + hotelData.roomprice * value * bookedDays);  
        } else if (name == 'checkindate' && inputs.checkoutdate && inputs.room) {
            var startDate = moment(value);
            var endDate = moment(inputs.checkoutdate);
            var days = endDate.diff(startDate, 'days');
            setBookedDays(days);
            setTotalPrice(additionalCharge + hotelData.roomprice * inputs.room * days);

        } else if (name == 'checkoutdate' && inputs.checkindate && inputs.room) {
            var startDate = moment(inputs.checkindate);
            var endDate = moment(value);
            var days = endDate.diff(startDate, 'days');
            setBookedDays(days);
            setTotalPrice(additionalCharge + hotelData.roomprice * inputs.room * days);
        }
        setInputs(values => ({...values, [name]: value}));
        
    }

    
    async function handleToken(token) {
        console.log(token);
        bookHotel(token.id, totalPrice, inputs)
        .then((response) => {
            navigate("/triphotel");
        })
        .catch((err) => {
            alert("Something went wrong");
        });
    }

    const formik=useFormik({
        initialValues:{
          fName:'',
          lName:'',
          address:'',
          email:'',
          phone:'',
          guest:'',
          room:''
        },
        validate:validateBookingForm,
        onSubmit:values=>{
          console.log(JSON.stringify(values));
        }
    });

    return (
    <div>
        
        <Header/>
        <br/>
        

        <div class="flex items-center justify-center p-12">

            <div class="mx-auto w-full max-w-[550px]">
            <h1 class="font-medium leading-tight text-5xl mt-0 mb-2 ml-8 text-emerald-600 text-center">Hotel Reservation</h1>
            <br/>
            <br/>
                <form onSubmit={formik.handleSubmit}>
                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                for="fName"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                First Name
                                </label>
                                <input
                                type="text"
                                name="fName"
                                id="fName"
                                onChange={handleChange}
                                onInput={formik.handleChange}
                                placeholder="First Name"
                                value={formik.values.fName}
                                onBlur={formik.handleBlur}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {formik.touched.fName && formik.errors.fName ? <span style={{color:'red'}}>{formik.errors.fName}</span> : null}
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                for="lName"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                Last Name
                                </label>
                                <input
                                type="text"
                                name="lName"
                                id="lName"
                                onChange={handleChange}
                                onInput={formik.handleChange}
                                value={formik.values.lName}
                                onBlur={formik.handleBlur}
                                placeholder="Last Name"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {formik.touched.lName && formik.errors.lName ? <span style={{color:'red'}}>{formik.errors.lName}</span> : null}

                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-5">
                        <label
                        for="address"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                        Permanent Address
                        </label>
                        <input
                        type="text"
                        name="address"
                        id="address"
                        onChange={handleChange}
                        onInput={formik.handleChange}
                        value={formik.values.address}
                        onBlur={formik.handleBlur}
                        placeholder="203, School lane, Colombo"
                        class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {formik.touched.address && formik.errors.address ? <span style={{color:'red'}}>{formik.errors.address}</span> : null}
                    </div>
                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                for="Email"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                Email Address
                                </label>
                                <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                value={formik.values.email}
                                onInput={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="abc@email.com"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {formik.touched.email && formik.errors.email ? <span style={{color:'red'}}>{formik.errors.email}</span> : null}
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                for="phone"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                Phone Number
                                </label>
                                <input
                                type="number"
                                name="phone"
                                id="phone"
                                onChange={handleChange}
                                value={formik.values.phone}
                                onInput={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="0711234567"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {formik.touched.phone && formik.errors.phone ? <span style={{color:'red'}}>{formik.errors.phone}</span> : null}

                            </div>
                        </div>
                    </div>

                    <div class="mb-5">
                        <label
                        for="guest"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                        How many guest are you bringing?
                        </label>
                        <input
                        type="number"
                        name="guest"
                        id="guest"
                        onChange={handleChange}
                        value={formik.values.guest}
                        onInput={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="5"
                        min="0"
                        class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {formik.touched.guest && formik.errors.guest ? <span style={{color:'red'}}>{formik.errors.guest}</span> : null}

                    </div>

                    <div class="mb-5">
                        <label
                        for="guest"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                        How many rooms do you like to book?
                        </label>
                        <input
                        type="number"
                        name="room"
                        id="room"
                        onChange={handleChange}
                        value={formik.values.room}
                        onInput={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="1"
                        min="1"
                        max = "100"
                        class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {formik.touched.room && formik.errors.room ? <span style={{color:'red'}}>{formik.errors.room}</span> : null}

                    </div>

                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                for="date"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                Check-in Date
                                </label>
                                <input
                                type="date"
                                name="checkindate"
                                id="checkindate"
                                onChange={handleChange}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                for="time"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                Check-in Time
                                </label>
                                <input
                                type="time"
                                name="checkintime"
                                id="checkintime"
                                onChange={handleChange}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                for="cdate"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                Check-out Date
                                </label>
                                <input
                                type="date"
                                name="checkoutdate"
                                id="checkoutdate"
                                onChange={handleChange}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                for="ctime"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                Check-out Time
                                </label>
                                <input
                                type="time"
                                name="checkouttime"
                                id="checkouttime"
                                onChange={handleChange}
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                for="Email"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                No of Children
                                </label>
                                <input
                                type="number"
                                name="child"
                                id="child"
                                onChange={handleChange}
                                min="0"
                                
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                for="phone"
                                class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                No of Adults
                                </label>
                                <input
                                type="number"
                                name="adult"
                                id="adult"
                                onChange={handleChange}
                                min="0"
                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* <button
                        class=" hover:shadow-form rounded-md bg-[#05b277] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                        Proceed to Payment
                        </button> */}
                    </div>
                </form>
                <StripeCheckout
                    amount = {totalPrice * 100}
                    label = {'Pay Now Rs.' + totalPrice}
                    name = 'TripEka'
                    description = {'Your Total Price is Rs.' + totalPrice}
                    panelLabel = 'Pay Now'
                    token = {handleToken}
                    stripeKey = {publishableKey}
                    currency = 'LKR' 
                />
            </div>
        </div>
        <br/>
        <br/>
        <Footer/>
    </div>
    )
}

export default HotelBookingForm