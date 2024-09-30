"use client"
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from "react";

export default function PaymentForm() {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(new Date('1985-12-25'));

    return (
        <div className="min-h-screen bg-neutral-100">

            {/* Header */}
            <div className="flex items-center p-4">
                <button onClick={() => router.back()}>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-700"/>
                    </div>
                </button>
                {/*<button onClick={() => router.back()} className="p-2" aria-label="Go back">*/}
                {/*    <ArrowLeftIcon className="w-6 h-6 text-gray-700"/>*/}
                {/*</button>*/}
                <h1 className="text-lg font-medium ml-2">Back To Flight List</h1>
            </div>

            {/* Form */}
            <form className="space-y-6 px-4 mt-4">
                {/* Name Field */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-base font-normal text-black">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 bg-white rounded border border-gray-300 text-base text-gray-700"
                        placeholder="Enter your name"
                        defaultValue="Jacky Chan"
                    />
                </div>

                {/* Date of Birth Field */}
                <div className="flex flex-col space-y-2 mt-4">
                    <label htmlFor="dob" className="text-base font-normal text-black">
                        Date of Birth
                    </label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-3 py-2 bg-white rounded border border-gray-300 text-base text-gray-700"
                        id="dob"
                        placeholderText="Select a date"
                    />
                </div>

                {/* Nationality Field */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="nationality" className="text-base font-normal text-black">Nationality</label>
                    <select
                        id="nationality"
                        className="w-full px-3 py-2 bg-white rounded border border-gray-300 text-base text-gray-700"
                        defaultValue="Singaporean"
                    >
                        <option value="Singaporean">Singaporean</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
            </form>

            {/* Proceed to Payment Button */}
            <div className="fixed bottom-16 left-0 w-full flex justify-center p-4">
                <button onClick={() => window.location.href = 'payment' }
                        className="w-3/4 h-12 bg-blue-800 rounded-full text-white text-xl font-bold">
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}
