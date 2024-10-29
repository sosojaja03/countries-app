import { ChangeEvent, useRef, useState, KeyboardEvent } from 'react';

interface OTPInputProps {
  numInputs: number;
}

const Test: React.FC<OTPInputProps> = ({ numInputs }) => {
  const [values, setValues] = useState<string[]>(Array(numInputs).fill(''));

  const InputRefs = useRef<HTMLInputElement[]>([]);

  //focusing on first input
  const handleRefCheck = () => {
    InputRefs.current[0]?.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value) {
      if (index < numInputs - 1) {
        InputRefs.current[index + 1]?.focus();
      } else if (index === numInputs - 1) {
        InputRefs.current[index]?.blur(); // unfocus last one
      }
    }
  };

  //delete inputs
  const handleDeleteInput = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      InputRefs.current[index - 1]?.focus();
    }
  };

  //paste numbers in inputs
  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    const pasteData = e.clipboardData?.getData('Text') ?? '';

    // allow only numbers
    if (!/^\d+$/.test(pasteData)) return;

    const pasteValues = pasteData.slice(0, numInputs).split('');
    setValues((prevValues) =>
      prevValues.map((_, i) => pasteValues[i] || prevValues[i])
    );

    // if (pasteValues.length === numInputs) {
    //   InputRefs.current[numInputs - 1]?.blur();
    // } else {
    //   InputRefs.current[pasteValues.length]?.focus();
    // }

    //goes to the last input and then got blured
    const lastFilledIndex =
      pasteValues.length >= numInputs ? numInputs - 1 : pasteValues.length - 1;
    InputRefs.current[lastFilledIndex]?.focus();
    InputRefs.current[lastFilledIndex]?.blur();
  };

  return (
    <>
      <h2 style={{ margin: 100, color: 'lightblue' }}> OTP - Input</h2>
      <div
        style={{
          display: 'flex',
          gap: 8,
          height: 50,
          margin: 100,
        }}
      >
        <button
          style={{
            paddingLeft: 30,
            paddingRight: 30,
            border: 'none',
            borderRadius: 8,
          }}
          onClick={handleRefCheck}
        >
          Focus
        </button>
        {values.map((value, index) => (
          <input
            //number of input fields depends on props which is passed from app.tsx as numInputs
            key={index}
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleDeleteInput(e, index)}
            onPaste={handlePaste}
            style={{ width: 60, border: 'none', borderRadius: 8, padding: 25 }}
            value={value}
            ref={(inputElementReference) => {
              if (inputElementReference) {
                InputRefs.current[index] = inputElementReference;
              }
            }}
          ></input>
        ))}
      </div>
    </>
  );
};

export default Test;
