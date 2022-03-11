export const getSavedTvIds = () => {
    const savedTvIds = localStorage.getItem('saved_tv')
      ? JSON.parse(localStorage.getItem('saved_tv'))
      : [];

    return savedTvIds;
  };

  export const saveTvIds = (tvIdArr) => {
    if (tvIdArr.length) {
      localStorage.setItem('saved_tv', JSON.stringify(tvIdArr));
    } else {
      localStorage.removeItem('saved_tv');
    }
  };

  export const removeTvId = (bookId) => {
    const savedTvIds = localStorage.getItem('saved_tv')
      ? JSON.parse(localStorage.getItem('saved_tv'))
      : null;

    if (!savedTvIds) {
      return false;
    }

    const updatedSavedTvIds = savedTvIds?.filter((savedTvId) => savedTvId !== tvId);
    localStorage.setItem('saved_tv', JSON.stringify(updatedSavedTvIds));

    return true;
  };