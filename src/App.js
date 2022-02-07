import React, { useState, useCallback } from 'react';
import Input from './Input';

function App() {

  const [form, setForm] = useState({
    userId: '',
    ticketNumber: ''
  });

  const onInputValidate = (value, name) => {
    setError(prev => ({
      ...prev,
      [name]: { ...prev[name], errorMsg: value }
    }));
  }

  const [error, setError] = useState({
    userId: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onInputValidate
    },
    ticketNumber: {
      isReq: true,
      errorMsg: '',
      onValidateFunc: onInputValidate
    }
  });

  const onInputChange = useCallback((value, name) => {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = () => {
    let isInvalid = false;
    Object.keys(error).forEach(x => {
      const errObj = error[x];
      if (errObj.errorMsg) {
        isInvalid = true;
      } else if (errObj.isReq && !form[x]) {
        isInvalid = true;
        onInputValidate(true, x);
      }
    });
    return !isInvalid;
  }

  const handleSubmit = () => {
    const isValid = validateForm();
    if (!isValid) {
      console.error('Invalid Form!');
      return false;
    }

    console.log('Data:', form);
  }

  return (
    <div className="app">
      <div className='mb-3'><strong>Min & Max Input validation in React - <a href="https://www.cluemediator.com" target="_blank" rel="noreferrer">Clue Mediator</a></strong></div>
      <div className='form'>
        <Input
          type="number"
          name="userId"
          title="User Id"
          value={form.userId}
          min={6}
          onChangeFunc={onInputChange}
          {...error.userId}
        />
        <Input
          type="number"
          name="ticketNumber"
          title="Ticket Number"
          value={form.ticketNumber}
          max={8}
          onChangeFunc={onInputChange}
          {...error.ticketNumber}
        />
        <button
          className='btn btn-primary btn-sm mt-2'
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;