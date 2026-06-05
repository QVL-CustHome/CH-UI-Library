import { Button, Card, Feedback } from "@custhome/ui";
import { useState } from "react";

export default function Widget() {
  const [count, setCount] = useState(0);
  return (
    <Card
      title="Widget fédéré"
      subtitle="Servi par l'app remote (port 4174)"
      actions={<Button onClick={() => setCount(count + 1)}>Cliqué {count} fois</Button>}
    >
      <Feedback severity="success">
        Ce widget consomme @custhome/ui partagé en singleton : même instance React et même
        thème que l'app hôte.
      </Feedback>
    </Card>
  );
}
