import React from "react";
import { TextField } from "@material-ui/core";
import classNames from "classnames/bind";
import styles from "./TextInput.module.scss";
const cx = classNames.bind(styles);
const TextInput = ({ id, type, label, placeholder, value, onChange }) => {
  return (
    <TextField
      id={id}
      type={type}
      label={label}
      placeholder={placeholder}
      className={cx("input-login")}
      value={value}
      onChange={onChange}
    ></TextField>
  );
};

export default TextInput;
