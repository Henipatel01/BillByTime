// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";

// export default function InputModal({
//     open,
//     title,
//     label,
//     defaultValue = "",
//     onClose,
//     onSubmit,
// }) {
//     const [value, setValue] = useState(defaultValue);

//     useEffect(() => {
//         if (open) setValue(defaultValue);
//     }, [open, defaultValue]);

//     if (!open) return null;

//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
//                 <h2 className="text-lg font-semibold mb-4">{title}</h2>

//                 <input
//                     autoFocus
//                     type="number"
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     placeholder={label}
//                     className="w-full border px-3 py-2 rounded mb-4"
//                 />

//                 <div className="flex gap-2">
//                     <button
//                         onClick={onClose}
//                         className="flex-1 bg-gray-200 py-2 rounded"
//                     >
//                         Cancel
//                     </button>

//                     <button
//                         onClick={() => {
//                             const num = Number(value);

//                             console.log("VALUE:", value);
//                             console.log("NUMBER:", num);

//                             if (!num || num <= 0) {
//                                 toast.error("Enter valid value");
//                                 return;
//                             }

//                             console.log("SUBMITTING...");
//                             onSubmit(num);
//                         }}
//                         className="flex-1 bg-emerald-600 text-white py-2 rounded"
//                     >
//                         Save
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function InputModal({
    open,
    title,
    label,
    defaultValue = "",
    onClose,
    onSubmit,
}) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        if (open) setValue(defaultValue);
    }, [open, defaultValue]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl w-80 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-[#1a4a3a] px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h2 className="text-base font-semibold text-white">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/60 hover:text-white transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            {label}
                        </p>
                        <div className="relative">
                            <input
                                autoFocus
                                type="number"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="0"
                                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 font-medium text-sm outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100 transition"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-1">
                        <button
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                const num = Number(value);
                                if (!num || num <= 0) {
                                    toast.error("Enter valid value");
                                    return;
                                }
                                onSubmit(num);
                            }}
                            className="flex-1 py-2.5 bg-[#1a4a3a] hover:bg-[#163d30] text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-md"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}