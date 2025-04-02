import "./styles.scss"; // CSS para las transiciones

interface IProps {
  children: React.ReactNode;
  showComponent: boolean;
}

const Transition = ({ children, showComponent }: IProps) => {
  return (
    <div
      className={`${
        !showComponent
          ? "fade-slide-exit fade-slide-exit-active"
          : "fade-slide-enter fade-slide-enter-active"
      }`}
    >
      {children}
    </div>
  );
};

export default Transition;
