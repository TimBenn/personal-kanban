import { TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TextToInput = (props) => {
  let { typographycontainerProps, TypographyProps, InputProps, TextFieldProps } = props;
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (TextFieldProps && TextFieldProps.autoFocus) {
      setFocused(true);
    }
  }, []);

  return (
    <div>
      {!focused ? (
        <div {...typographycontainerProps} onClick={() => setFocused(true)}>
          <Typography {...TypographyProps}>
            {TextFieldProps.value || InputProps?.placeholder || ''}
          </Typography>
        </div>
      ) : (
        <TextField
          InputProps={InputProps}
          {...TextFieldProps}
          onFocus={() => {
            if (TextFieldProps && TextFieldProps.onFocus) TextFieldProps.onFocus();
            setFocused(true);
          }}
          onBlur={() => {
            if (TextFieldProps && TextFieldProps.onBlur) TextFieldProps.onFocus();
            setFocused(false);
          }}
        />
      )}
    </div>
  );
};

TextToInput.propTypes = {
  typographycontainerProps: PropTypes.object,
  TypographyProps: PropTypes.object,
  InputProps: PropTypes.object,
  TextFieldProps: PropTypes.object,
};

export default TextToInput;
