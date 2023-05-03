import { useMutation } from 'react-query';
import instance from '../configurations/configurations';
import { SERVER_URL } from '../../constants/api/urls';

const deleteChallengeMutationFn = ({ challengeId }) => {
  return instance.delete(`${SERVER_URL}/Challenge/delete?challengeId=${challengeId}`, false).then((res) => res.data);
};

export const useDeleteChallenge = ({ onSuccess, onError }) => {
  const { mutate: deleteChallenge } = useMutation(deleteChallengeMutationFn, {
    mutationKey: 'deleteChallenge',
    onSuccess,
    onError,
  });
  return { deleteChallenge };
};
