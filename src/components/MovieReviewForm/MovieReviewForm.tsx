import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import { useSelectedMovie } from '../../hooks/useSelectedMovie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostMovieReviewMutation } from '../../redux/apiSlice';
import { useTemporaryMessage } from '../../hooks/useTemporaryMessage';
import { useCallback } from 'react';

type FormValues = {
  review: string;
};

export const MovieReviewForm = () => {
  const movie = useSelectedMovie();
  const [postMovieReview, { isLoading, data: response }] =
    usePostMovieReviewMutation();

  const {
    temporaryMessage: temporarySuccessMessage,
    setTemporaryMessage: setTemporarySuccessMessage,
  } = useTemporaryMessage();

  const {
    temporaryMessage: temporaryErrorMessage,
    setTemporaryMessage: setTemporaryErrorMessage,
  } = useTemporaryMessage();

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
      setTemporarySuccessMessage(message);
      reset();
    } catch (e) {
      // Given an error response shape, we can map the field's keys, calling `setError`
      // from react-hook-form to programatically set each field's isInvalid state and
      // set it's error message.  But for now...
      setTemporaryErrorMessage('Something went wrong');
    }
  }, []);

  if (!movie) {
    return null;
  }

  const maxLengthHelperText = 'The maximum review length is 100 characters';

  return (
    <Stack spacing={2}>
      <Typography variant="h6" component="h2">
        Please leave a review for {movie.title}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {temporarySuccessMessage ? (
            <Alert
              severity="success"
              sx={{ height: 114, alignItems: 'center' }}
            >
              {temporarySuccessMessage}
            </Alert>
          ) : temporaryErrorMessage ? (
            <Alert severity="error" sx={{ height: 114, alignItems: 'center' }}>
              {temporaryErrorMessage}
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
  );
};
