import { Header } from "@/src/components/Header";
import { Container } from "./styles";
import { Highlight } from "@/src/components/Highlight";
import { ButtonIcon } from "@/src/components/ButtonIcon";

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />
      <ButtonIcon type="PRIMARY" />
    </Container>
  );
}
