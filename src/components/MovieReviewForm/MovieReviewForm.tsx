import {
  Alert,
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSelectedMovie } from '@/src/hooks/useSelectedMovie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostMovieReviewMutation } from '@/src/redux/apiSlice';
import { useTemporaryMessage } from '@/src/hooks/useTemporaryMessage';
import { PropsWithChildren, useCallback } from 'react';
import { useToggleQuerystringValue } from '@/src/hooks/useToggleQuerystringValue';
import { useMdAndUpBreakpoint } from '@/src/hooks/useMdAndUpBreakpoint';
import { SELECTED_MOVIE_ID_QUERYSTRING_KEY } from '@/src/constants/constants';

type FormValues = {
  review: string;
};

export const MovieReviewForm = () => {
  const movie = useSelectedMovie();

  const { setQuerystring: setSelected, value: selected } =
    useToggleQuerystringValue(SELECTED_MOVIE_ID_QUERYSTRING_KEY);

  const [postMovieReview, { isLoading }] = usePostMovieReviewMutation();

  const { message: successMessage, setMessage: setSuccessMessage } =
    useTemporaryMessage();

  const { message: errorMessage, setMessage: setErrorMessage } =
    useTemporaryMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>();

  const values = watch();

  const onSubmit: SubmitHandler<FormValues> = useCallback(async (data) => {
    try {
      const { message } = await postMovieReview(data).unwrap();
      setSuccessMessage(message);
      reset();
    } catch (e) {
      // Given an error response shape, we can map the field's keys, calling `setError`
      // from react-hook-form to programatically set each field's isInvalid state and
      // set it's error message.  But for now...
      setErrorMessage('Something went wrong');
    }
  }, []);

  const isMdAndUp = useMdAndUpBreakpoint();

  /**
   * It would be nicer to pass this as a prop in a real world scenarion to provide
   * more potential re-use, or it could be returned from a hook to provide the
   * modal/inline functionality to more components
   */
  const WrappingComponent = useCallback(
    ({ children }: PropsWithChildren) => {
      if (isMdAndUp || !selected) {
        return <>{children}</>;
      }
      return (
        <Dialog open onClose={() => setSelected(selected)}>
          <Box padding={2}>{children}</Box>
        </Dialog>
      );
    },
    [isMdAndUp, selected]
  );

  if (!movie || !selected) {
    return null;
  }

  const maxLengthHelperText = 'The maximum review length is 100 characters';

  return (
    <WrappingComponent>
      <Stack spacing={2}>
        <Typography variant="h6" component="h2">
          Please leave a review for {movie.title}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            {successMessage ? (
              <Alert
                severity="success"
                sx={{ height: 114, alignItems: 'center' }}
              >
                {successMessage}
              </Alert>
            ) : errorMessage ? (
              <Alert
                severity="error"
                sx={{ height: 114, alignItems: 'center' }}
              >
                {errorMessage}
              </Alert>
            ) : (
              <Stack spacing={2}>
                <TextField
                  type="text"
                  label="Review"
                  {...register('review', {
                    required: 'This field is required',
                    maxLength: {
                      value: 100,
                      message: maxLengthHelperText,
                    },
                  })}
                  error={Boolean(errors.review)}
                  helperText={
                    (errors.review &&
                      `${errors.review.message}.  You have entered ${values.review.length} characters.`) ??
                    maxLengthHelperText
                  }
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Please wait' : 'Submit'}
                </Button>
              </Stack>
            )}
          </Stack>
        </form>
      </Stack>
    </WrappingComponent>
  );
};
