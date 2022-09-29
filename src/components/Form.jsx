import { useState } from "react"
import PortfolioModal from "./model";

const Form = () => {
  const [formValues, setFormValues] = useState({
    year: '',
    money: '',
    risk: '',
    email: ''
  })
  const [errors, setErrors] = useState({
    year: '',
    money: '',
    risk: '',
    email: '',
    all: ''
  })

  const [openModal, setOpenModal] = useState(false)

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const getYearsRadio = () => {
    var row = []
    for (let i = 1; i <= 10; i++) {
      row.push(
        <div key={i} className="col-1 px-0 d-flex align-items-center">
          <input id={i} type="radio" name='year' value={i} onChange={(e) => handleOnChange(e)} />
          <label htmlFor={i} className="ms-2">{i}</label>
        </div>
      )
    }
    return row
  }

  const resetForm = () => {
    setFormValues({
      year: '',
      money: '',
      risk: '',
      email: '',
    })
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const checkFieldRequire = (formValues) => {
    if (formValues.money !== '' && formValues.risk !== '' && formValues.year !== '' && formValues.email !== '') {
      setErrors({ ...errors, all: '' })
      return true
    } else {
      setErrors({ ...errors, all: 'Fields Required' })
      return false
    }
  }

  const checkValidation = (errors) => {
    if (errors.money === '' && errors.risk === '' && errors.year === '' && errors.email === '') {
      return true
    } else {
      return false
    }
  }

  const checkEmailValidation = (email) => {
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      setErrors({ ...errors, email: 'please enter valid email' })
    } else {
      setErrors({ ...errors, email: '' })
    }
  }

  const checkIntegerValidation = (money) => {
    if (!/(\d+(?:\.\d+)?)/.test(+money)) {
      setErrors({ ...errors, money: 'money should be a number' })
    } else {
      setErrors({ ...errors, money: '' })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (checkFieldRequire(formValues) && checkValidation(errors)) {
      toggleModal()
      resetForm()
    }
  }

  return (
    <>
      <h1>Portfolio Recommendation</h1>
      <form>
        <div>
          <label>How much do you want to invest?</label>
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input name="money" value={formValues.money} type="text" onBlur={() => checkIntegerValidation(formValues.money)} onChange={(e) => handleOnChange(e)} className="form-control" />
            <span className="input-group-text">.00</span>
          </div>
          <small className="text-danger">{errors.money}</small>
        </div>
        <div className="">
          <label>How long can you keep your money invested?</label>
          <div className="row mx-0">
            {getYearsRadio()}
          </div>
          <div className="row mx-0">
            <div className="col-4">
              <small>{`Short Term (Less than a year)`}</small>
            </div>
            <div className="col-4">
              <small>{`Mid Term (1-3 years)`}</small>
            </div>
            <div className="col-4">
              <small>{`Long Term (More than 3 years)`}</small>
            </div>
          </div>
          <small className="text-danger">{errors.year}</small>
        </div>
        <div className="row mx-0 my-5">
          <label>Are you prepared to loos some or all of your investment?</label>
          <div className="mt-2">
            <div className="px-0 d-flex align-items-center">
              <input id={'radio1'} type="radio" onChange={(e) => handleOnChange(e)} name='risk' value={'I can tolerate loosing all or a big portion of my money, I want to maximize my chance of making more money'} />
              <label htmlFor='radio1' className="ms-2">I can tolerate loosing all or a big portion of my money, I want to maximize my chance of making more money</label>
            </div>
            <div className="px-0 d-flex align-items-center">
              <input id='radio2' type="radio" onChange={(e) => handleOnChange(e)} name='risk' value={'I can take some risk to make more money, but I can not lose mmore than a quarter of my money'} />
              <label htmlFor='radio2' className="ms-2">I can take some risk to make more money, but I can't lose mmore than a quarter of my money</label>
            </div>
            <div className="px-0 d-flex align-items-center">
              <input id='radio3' type="radio" onChange={(e) => handleOnChange(e)} name='risk' value={'I will be very uncomfortable loosing more than 10% and accept lower return'} />
              <label htmlFor='radio3' className="ms-2">I will be very uncomfortable loosing more than 10% and accept lower return</label>
            </div>
            <div className="px-0 d-flex align-items-center">
              <input id='radio4' type="radio" onChange={(e) => handleOnChange(e)} name='risk' value={'I want the safest investment possible'} />
              <label htmlFor='radio4' className="ms-2">I want the safest investment possible</label>
            </div>
          </div>
          <small className="text-danger">{errors.risk}</small>
        </div>
        <div className="my-5">
          <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
          <input name='email' value={formValues.email} onBlur={() => checkEmailValidation(formValues.email)} onChange={(e) => handleOnChange(e)} type="email" className="form-control" placeholder="name@example.com" />
          <small className="text-danger">{errors.email}</small>
        </div>
        <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Get My Portfolio</button>
        <p className="text-danger mt-2">{errors.all}</p>
      </form>
      <PortfolioModal
        open={openModal}
        toggle={toggleModal}
        formValues={formValues}
      />
    </>

  )
}

export default Form