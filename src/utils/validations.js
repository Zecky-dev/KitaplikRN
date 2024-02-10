import React from 'react'
import * as yup from 'yup'

const ERRORS = {
    string: "Bu alana sadece metinsel ifadeler girebilirsiniz!",
    required: "Bu alanın girilmesi zorunludur!",
    email: "E-posta formatına uygun giriş yapınız!",
}



const RegisterSchema = yup.object().shape({
    nameSurname: yup
    .string(ERRORS.string)
    .required(ERRORS.required),
    emailAddress: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .email(ERRORS.email),
    username: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(3, ({min}) => `Minimum ${min} uzunluğunda giriş yapınız!`)
    .max(16, ({max}) => `Maksimum ${max}d uzunluğunda giriş yapınız!`),
    password: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(6, ({min}) => `Minimum ${min} karakter uzunluğunda giriş yapınız!`)
    .max(16, ({max}) => `Minimum ${max} karakter uzunluğunda giriş yapınız!`),
    passwordAgain: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .oneOf([yup.ref('password')], "Şifreleriniz eşleşmiyor!")
})

const LoginSchema = yup.object().shape({
    email: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .email(ERRORS.email),
    password: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
    .min(6, ({min}) => `Minimum ${min} karakter uzunluğunda giriş yapınız!`)
    .max(16, ({max}) => `Minimum ${max} karakter uzunluğunda giriş yapınız!`)
})

const PostSchema = yup.object().shape({
    image: yup.
    string(ERRORS.string)
    .required(ERRORS.required),
    content: yup
    .string(ERRORS.string)
    .required(ERRORS.required)
})

export {RegisterSchema,LoginSchema,PostSchema}