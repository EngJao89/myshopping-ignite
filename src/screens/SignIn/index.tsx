import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();
  }

  function handleCreateUserAccount() {
    auth().createUserWithEmailAndPassword(email, password)
    .then(() => Alert.alert('Usuário criado com sucesso!'))
    .catch(error => {
      console.log(error.code)
      if(error.code === 'auth/email-already-in-use'){
        return Alert.alert('E-mail não disponível.Escolha outro e-mail para cadastrar!');
      }

      if(error.code === 'auth/invalid email'){
        return Alert.alert('E-mail inválido!');
      }

      if(error.code === 'auth/weak-password'){
        return Alert.alert('A senha deve ter ao mínimo 6 digitos.');
      }
    })
  }

  function handleSingInWithEmailAndPassword(){
    auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => console.log(user))
    .catch(error => {
      if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
        Alert.alert('Usuário não encontrado. E-mail e/ou senha inválida!');
      }
    })
  }

  function handleForgotPassword(){
    auth()
    .sendPasswordResetEmail(email)
    .then(() => Alert.alert('Enviamos um link no seu e-mail para você redefinir sua senha.'))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSingInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}