import Logo from "./Logo";
import imgSrc from "./next-logo.png";

export default function NextLogo(props) {
  return <Logo src={imgSrc} alt="Next Logo" cls={props.cls} />;
}
