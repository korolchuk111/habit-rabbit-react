import { useMutation } from 'react-query';
import instance from '../configurations/configurations';
import { SERVER_URL } from '../../constants/api/urls';

const removeProgressMutationFn = ({ taskId }) => {
  return instance.post(`${SERVER_URL}/DailyTask/remove-progress?taskId=${taskId}`, false).then((res) => res.data);
};

export const useRemoveProgress = ({ onSuccess, onError }) => {
  const { mutate: removeProgressChallenge } = useMutation(removeProgressMutationFn, {
    mutationKey: 'removeProgressChallenge',
    onSuccess,
    onError,
  });
  return { removeProgressChallenge };
};
