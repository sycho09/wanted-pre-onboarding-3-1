const textHighligter = (text: string, keyword: string) => {
  const findText = text.toUpperCase();
  const findKeyword = keyword.toUpperCase();
  if (findKeyword !== '' && findText.includes(findKeyword)) {
    const words = findText.split(new RegExp(`(${findKeyword})`, 'g'));

    return (
      <>
        {words.map((word, i) => (
          <span key={word + i}>
            {word === findKeyword ? (
              <strong style={{ fontWeight: 'bold' }}>{word}</strong>
            ) : (
              <span>{word}</span>
            )}
          </span>
        ))}
      </>
    );
  }
};

export default textHighligter;
