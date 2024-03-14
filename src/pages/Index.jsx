import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-hoaq.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        setIsLoggedIn(true);
      } else {
        toast({
          title: "Error de inicio de sesión",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-hoaq.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast({
          title: "Registro exitoso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error de registro",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoggedIn) {
    return (
      <Box>
        <Heading>Bienvenido a movieplay10</Heading>
        {/* Aquí puedes agregar el contenido de la aplicación de streaming */}
      </Box>
    );
  }

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <Heading mb={8}>Iniciar sesión o registrarse</Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Correo electrónico</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button onClick={handleLogin}>Iniciar sesión</Button>
        <Text>
          ¿No tienes una cuenta?{" "}
          <Button variant="link" onClick={handleSignup}>
            Regístrate
          </Button>
        </Text>
      </Stack>
    </Box>
  );
};

export default Index;
