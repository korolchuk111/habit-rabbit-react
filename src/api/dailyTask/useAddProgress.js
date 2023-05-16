import { useMutation } from "react-query";
import instance from "../configurations/configurations";
import { SERVER_URL } from "../../constants/api/urls";

const addProgressMutationFn = (progress) => {
  return instance.post(`${SERVER_URL}/DailyTask/add-progress`, progress, false).then((res) => res.data);
};

export const useAddProgress = ({ onSuccess, onError }) => {
  const { mutate: addProgressChallenge } = useMutation(addProgressMutationFn, {
    mutationKey: 'addProgressChallenge',
    onSuccess,
    onError,
  });
  return { addProgressChallenge };
};
