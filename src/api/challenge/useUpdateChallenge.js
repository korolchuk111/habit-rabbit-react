import { useMutation } from "react-query";
import instance from "../configurations/configurations";
import { SERVER_URL } from "../../constants/api/urls";

const updateChallengeMutationFn = (challenge) => {
  return instance.post(`${SERVER_URL}/Challenge/update`, challenge, false).then((res) => res.data);
};

export const useUpdateChallenge = ({ onSuccess, onError }) => {
  const { mutate: updateChallenge } = useMutation(updateChallengeMutationFn, {
    mutationKey: 'updateChallenge',
    onSuccess,
    onError,
  });
  return { updateChallenge };
};
