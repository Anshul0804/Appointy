import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  // ✅ single line context
  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();

      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append(
        'address',
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            token: aToken   // 🔥 MOST IMPORTANT FIX
          }
        }
      );

      if (data.success) {
        toast.success(data.message)

        // reset form
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error(error);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img
              className='w-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-10 text-gray-600'>

          {/* LEFT */}
          <div className='flex-1 flex flex-col gap-4'>

            <input value={name} onChange={e => setName(e.target.value)} placeholder='Name' className='border px-3 py-2 rounded' required />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' className='border px-3 py-2 rounded' required />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type='password' className='border px-3 py-2 rounded' required />

            <select value={experience} onChange={e => setExperience(e.target.value)} className='border px-2 py-2 rounded'>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
              <option>5 Years</option>
              <option>10+ Years</option>
            </select>

            <input value={fees} onChange={e => setFees(e.target.value)} type='number' placeholder='Fees' className='border px-3 py-2 rounded' required />

          </div>

          {/* RIGHT */}
          <div className='flex-1 flex flex-col gap-4'>

            <select value={speciality} onChange={e => setSpeciality(e.target.value)} className='border px-2 py-2 rounded'>
             <option value="General physician">General physician</option>
  <option value="Gynecologist">Gynecologist</option>
  <option value="Dermatologist">Dermatologist</option>
  <option value="Pediatricians">Pediatricians</option>
  <option value="Neurologist">Neurologist</option>
  <option value="Gastroenterologist">Gastroenterologist</option>
</select>

            <input value={degree} onChange={e => setDegree(e.target.value)} placeholder='Degree' className='border px-3 py-2 rounded' required />

            <input value={address1} onChange={e => setAddress1(e.target.value)} placeholder='Address line 1' className='border px-3 py-2 rounded' required />
            <input value={address2} onChange={e => setAddress2(e.target.value)} placeholder='Address line 2' className='border px-3 py-2 rounded' required />

          </div>

        </div>

        <textarea value={about} onChange={e => setAbout(e.target.value)} placeholder='About doctor' className='w-full border px-4 py-2 mt-4 rounded' />

        <button className='bg-primary text-white px-10 py-3 mt-4 rounded-full'>
          Add Doctor
        </button>

      </div>
    </form>
  )
}

export default AddDoctor