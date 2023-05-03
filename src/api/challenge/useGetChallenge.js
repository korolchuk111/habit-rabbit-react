import { useMutation } from 'react-query';
import instance from '../configurations/configurations';
import { SERVER_URL } from '../../constants/api/urls';

const getChallengeMutationFn = ({ id }) => {
  return instance.get(`${SERVER_URL}/Challenge/${id}`, false).then((res) => res.data);
};

export const useGetChallenge = ({ onSuccess, onError }) => {
  const { mutate: getChallenge } = useMutation(getChallengeMutationFn, {
    mutationKey: 'getChallenge',
    onSuccess,
    onError,
  });
  return { getChallenge };
};
