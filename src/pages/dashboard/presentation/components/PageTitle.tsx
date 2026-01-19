const PageTitle = ({ title, ref }: { title: string; ref: React.RefObject<HTMLHeadingElement> }) => {
  return (
    <h2
      ref={ref}
      style={{
        fontSize: '10vw',
        color: '#dedddd',
        fontFamily: 'aurochs',
        lineHeight: 1,
      }}
    >
      {title}
    </h2>
  );
};

export default PageTitle;
