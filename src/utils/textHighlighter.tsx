const textHighligter = (text: string, keyword: string) => {
  if (keyword !== '' && text.includes(keyword)) {
    const words = text.split(new RegExp(`(${keyword})`, 'g'));

    return (
      <>
        {words.map((word, i) => (
          <span key={word + i}>
            {word === keyword ? (
              <span style={{ fontWeight: 'bold' }}>{word}</span>
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
