import { Header } from "@/src/components/Header";
import { Highlight } from "@/src/components/Highlight";
import { Container, Content, Icon } from "./styles";
import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title={"Nova Turma"}
          subtitle={"crie a turma para adicionar as pessoas"}
        />
        <Input />
        <Button title="Criar" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
}
