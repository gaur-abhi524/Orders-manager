export const refreshToken = (response: any) => {
  let refreshTiming = (response.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  const refToken = async () => {
    const newAuthres = await response.reloadAuthResponse();
    refreshTiming = (newAuthres.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    console.log('newAuthRes: ', newAuthres);
    console.log('new Auth token: ', newAuthres.id_token);

    setTimeout(refToken, refreshTiming);
  };
  setTimeout(refToken, refreshTiming);
};
