import { useMutation } from "react-query";
import instance from "../configurations/configurations";
import { SERVER_URL } from "../../constants/api/urls";

const getStatisticsChallengeMutationFn = ({ id }) => {
  return instance.get(`${SERVER_URL}/Challenge/statistics/${id}`, false).then((res) => res.data);
};

export const useGetStatisticsChallenge = ({ onSuccess, onError }) => {
  const { mutate: getStatisticsChallenge } = useMutation(getStatisticsChallengeMutationFn, {
    mutationKey: 'getStatisticsChallenge',
    onSuccess,
    onError,
  });
  return { getStatisticsChallenge };
};
