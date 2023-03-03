import classNames from "classnames";
import moment from "moment";
import { useEffect, useReducer, useState } from "react"

const reducer = (state, action) => {
    switch (action.type) {
        case "notes":
            return state = { ...state, notes: action.payload }
        case "Name":
            return state = { ...state, Name: action.payload };
        case "FatherName":
            return state = { ...state, FatherName: action.payload };
        case "MotherName":
            return state = { ...state, MotherName: action.payload };
        case "Address":
            return state = { ...state, Address: action.payload };
        case "DOB":
            return state = { ...state, DOB: action.payload };
        case "gender":
            return state = { ...state, gender: action.payload };
        case "Doctor":
            return state = { ...state, Doctor: action.payload };
        case "Hospital":
            return state = { ...state, Hospital: action.payload };
        case "UPDATE":
            return state = action.payload;
        default:
            return state;
    }
};

const UserRow = ({ items, person, currentID, currentUser, setDetails, setOpenPopup }) => {
    // const hba1c = items.current && items.current.hBA1C && items.current.hBA1C.filter(item => item.studentId === person.ydfID)
    const hba1c = person.hba1c
    // const insulin = items.current && items.current.insulin && items.current.insulin.filter(item => item.studentId === person.ydfID)
    const insulin = person.insulin
    // const syringe = items.current && items.current.syringe && items.current.syringe.filter(item => item.studentId === person.ydfID)
    const syringe = person.syringe
    // const strip = items.current && items.current.strip && items.current.strip.filter(item => item.studentId === person.ydfID)
    const strip = person.strip

    const [editable, setEditable] = useState(false)
    const [date, setDate] = useState()
    const [fields, dispatch] = useReducer(reducer, { ...person });

    const handleEdit = async () => {
        const token = sessionStorage.getItem('token')
        const req = await fetch('https://yogdhyaan-ngo.onrender.com/student/update', { method: 'put', headers: { 'Content-Type': 'application/json', "Authorization" : `Bearer ${token}` }, body: JSON.stringify({ ydfID: person.ydfID, notes: fields.notes, Name: fields.Name, gender: fields.gender, FatherName: fields.FatherName, MotherName: fields.MotherName, Address: fields.Address, DOB: date, Doctor: fields.Doctor, Hospital: fields.Hospital }) })
        console.log({ ydfID: person.ydfID, notes: fields.notes, Name: fields.Name, gender: fields.gender, FatherName: fields.FatherName, MotherName: fields.MotherName, Address: fields.Address, DOB: date, Doctor: fields.Doctor, Hospital: fields.Hospital })
        setEditable(prev => !prev)
    }

    const formatDate = () => {
        if (person && person.DOB) {
            let date = new Date(person.DOB);
            let day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear(),
                hour = date.getHours(),
                min = date.getMinutes();

            month = (month < 10 ? "0" : "") + month;
            day = (day < 10 ? "0" : "") + day;
            hour = (hour < 10 ? "0" : "") + hour;
            min = (min < 10 ? "0" : "") + min;

            let today = year + "-" + month + "-" + day
            setDate(today)
        }
    }

    useEffect(() => {
        formatDate()
        dispatch({ type: 'UPDATE', payload: person })
    }, [person])

    return (

        <tr key={person.email}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-black placeholder:font-normal sm:pl-6">
                {person.ydfID}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <textarea disabled={!editable} value={fields.notes} onChange={(e) => dispatch({ type: 'notes', payload: e.target.value })} className={!editable ? 'border-none text-black font-medium placeholder:font-normal pl-0' : 'pl-0 rounded-lg text-black placeholder:font-normal'} />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div><input type='text' disabled={!editable} placeholder='Student Name' value={fields.Name} onChange={(e) => dispatch({ type: 'Name', payload: e.target.value })} className={classNames(!editable ? 'border-none' : 'rounded-lg', 'pl-0 text-black placeholder:font-normal font-medium w-28 max-w-40')} /></div>
                <div><input type='text' disabled={!editable} placeholder='Fathername' value={fields.FatherName} onChange={(e) => dispatch({ type: 'FatherName', payload: e.target.value })} className={classNames(!editable ? 'border-none' : 'text-black rounded-lg', 'pl-0 text-black placeholder:font-normal font-medium w-28 max-w-40')} /></div>
                <div><input type='text' disabled={!editable} placeholder='Mothername' value={fields.MotherName} onChange={(e) => dispatch({ type: 'MotherName', payload: e.target.value })} className={classNames(!editable ? 'border-none' : 'text-black rounded-lg', 'pl-0 text-black placeholder:font-normal font-medium w-28 max-w-40')} /></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <textarea disabled={!editable} value={fields.Address} onChange={(e) => dispatch({ type: 'Address', payload: e.target.value })} className={classNames(!editable ? 'border-none' : 'rounded-lg', 'pl-0 text-black font-medium placeholder:font-normal w-15 max-w-15')} />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <input type='date' disabled={!editable} value={date} onChange={(e) => setDate(e.target.value)} className={!editable ? 'text-black font-medium placeholder:font-normal border-none pl-0' : 'pl-0 text-black font-medium placeholder:font-normal rounded-lg'} />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <input type='text' disabled={!editable} value={fields.gender} onChange={(e) => dispatch({ type: 'gender', payload: e.target.value })} className={classNames(!editable ? 'border-none' : 'rounded-lg', 'pl-0 text-black font-medium placeholder:font-normal w-20')} />
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <div><input type='text' disabled={!editable} value={fields.Doctor} onChange={(e) => dispatch({ type: 'Doctor', payload: e.target.value })} placeholder='Doctor Name' className={classNames(!editable ? 'border-none' : 'rounded-lg', 'text-black placeholder:font-normal font-medium pl-0 w-28 max-w-30')} /></div>
                <div><input type='text' disabled={!editable} value={fields.Hospital} onChange={(e) => dispatch({ type: 'Hospital', payload: e.target.value })} placeholder='Hospital Name' className={classNames(!editable ? 'border-none' : 'rounded-lg', 'text-black placeholder:font-normal font-medium pl-0 w-28 max-w-30')} /></div>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500 cursor-pointer" onClick={() => { currentID.current = person.ydfID; currentUser.current = person; setDetails({ key: 'hba1c', data: hba1c }); setOpenPopup(true) }}>{hba1c && hba1c[hba1c.length - 1] && hba1c[hba1c.length - 1].value}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500 cursor-pointer" onClick={() => { currentID.current = person.ydfID; currentUser.current = person; setDetails({ key: 'insulin', data: insulin }); setOpenPopup(true) }}>{insulin && insulin[insulin.length - 1] && insulin[insulin.length - 1].value}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500 cursor-pointer" onClick={() => { currentID.current = person.ydfID; currentUser.current = person; setDetails({ key: 'strip', data: strip }); setOpenPopup(true) }}>{strip && strip[strip.length - 1] && strip[strip.length - 1].value}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500 cursor-pointer" onClick={() => { currentID.current = person.ydfID; currentUser.current = person; setDetails({ key: 'syringe', data: syringe }); setOpenPopup(true) }}>{syringe && syringe[syringe.length - 1] && syringe[syringe.length - 1].value}</td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6" onClick={() => handleEdit()}>
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    {!editable ? 'Edit' : 'Save'}<span className="sr-only">, {person.name}</span>
                </a>
            </td>
        </tr>

    )
}

export default UserRow;