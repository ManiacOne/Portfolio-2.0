interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  ref: React.RefObject<HTMLHeadingElement>;
}

const PageTitle = ({ title, ref }: PageTitleProps) => {
  return (
    <h2
      ref={ref}
      style={{
        fontSize: 'clamp(3rem, 0.143rem + 7.619vw, 7rem)',
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
