import * as Yup from 'yup';
import { useEffect, useState } from "react";
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { createBrowserHistory } from "history";
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import tokenService from "../../../services/tokens";
import { register } from "../../../services/authentication";

// ----------------------------------------------------------------------

function RegisterForm() {
  const history = createBrowserHistory();

  useEffect(() => {
    tokenService.deleteTokens();
  }, []);

  const onFinish = (values) => {
    register(values, history);
  };

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string().required('First name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    userName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onFinish)}>
      <Stack spacing={3}>
        <RHFTextField name="userName" label="Username" />

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

export default RegisterForm;
