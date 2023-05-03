import { useMutation } from 'react-query';
import instance from '../configurations/configurations';
import { SERVER_URL } from '../../constants/api/urls';

const getFrequencyMutationFn = () => {
  return instance.get(`${SERVER_URL}/Frequency`, false).then((res) => res.data);
};

export const useGetFrequency = ({ onSuccess, onError }) => {
  const { mutate: getFrequency } = useMutation(getFrequencyMutationFn, {
    mutationKey: 'getFrequency',
    onSuccess,
    onError,
  });
  return { getFrequency };
};
