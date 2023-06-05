import { useMutation } from "react-query";
import instance from "../configurations/configurations";
import { SERVER_URL } from "../../constants/api/urls";

const getStatisticsChallengesMutationFn = () => {
  return instance.get(`${SERVER_URL}/Challenge/statistics`, false).then((res) => res.data);
};

export const useGetStatisticsChallenges = ({ onSuccess, onError }) => {
  const { mutate: getStatisticsChallenges } = useMutation(getStatisticsChallengesMutationFn, {
    mutationKey: 'getStatisticsChallenges',
    onSuccess,
    onError,
  });
  return { getStatisticsChallenges };
};
