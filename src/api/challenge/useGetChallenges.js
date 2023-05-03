import { useMutation } from "react-query";
import instance from "../configurations/configurations";
import { SERVER_URL } from "../../constants/api/urls";

const getChallengesMutationFn = () => {
  return instance.get(`${SERVER_URL}/Challenge`, false).then((res) => res.data);
};

export const useGetChallenges = ({ onSuccess, onError }) => {
  const { mutate: getChallenges } = useMutation(getChallengesMutationFn, {
    mutationKey: 'getChallenges',
    onSuccess,
    onError,
  });
  return { getChallenges };
};
