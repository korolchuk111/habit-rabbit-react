import { useMutation } from "react-query";
import instance from "../configurations/configurations";
import { SERVER_URL } from "../../constants/api/urls";

const createChallengeMutationFn = (challenge) => {
  return instance.post(`${SERVER_URL}/Challenge/create`, challenge, false).then((res) => res.data);
};

export const useCreateChallenge = ({ onSuccess, onError }) => {
  const { mutate: createChallenge } = useMutation(createChallengeMutationFn, {
    mutationKey: 'createChallenge',
    onSuccess,
    onError,
  });
  return { createChallenge };
};
