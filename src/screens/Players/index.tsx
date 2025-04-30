import { Header } from "@/src/components/Header";
import { Container, Form } from "./styles";
import { Highlight } from "@/src/components/Highlight";
import { ButtonIcon } from "@/src/components/ButtonIcon";
import { Input } from "@/src/components/Input";
import { Filter } from "@/src/components/Filter";

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da Pessoa" autoCorrect={false} />
        <ButtonIcon icon={"add"} type="PRIMARY" />
      </Form>
      <Filter title="Time A" isActive />
    </Container>
  );
}
