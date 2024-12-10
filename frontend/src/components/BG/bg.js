import Image from "next/image";

const Bg = () => {
  return (
    <Image
        src="/assets/images/bg.svg"
        height={2051}
        width={1497}
        className="bg_image"
        alt="Background Pattern"

    />
  )
}

export default Bg;