import {
BaseButton,
GoogleSignInButton,
InvertedButton,
SpinnerInButton
  } from './button.styles';
  
  export const Button_Type_classes = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
  };
  
   const getButton = (buttonType = Button_Type_classes.base) =>
    ({
      [Button_Type_classes.base]: BaseButton,
      [Button_Type_classes.google]: GoogleSignInButton,
      [Button_Type_classes.inverted]: InvertedButton,
    }[buttonType]);
  
  export const Button = ({ children, buttonType, isLoading,  handelClick, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton onClick={handelClick} {...otherProps}>
      {isLoading ? <SpinnerInButton/> : children}
      </CustomButton>;
  };
  