package com.example.dienstleistungsSoftware.user;

import com.example.dienstleistungsSoftware.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
  private final UserRepository userRepository;

  @Autowired
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public void addNewUser(UserEntity userEntity) {
    Optional<UserEntity> userOptional = userRepository.findUserByEmail(userEntity.getEmail());
    if (userOptional.isPresent()) {
      throw new IllegalStateException("This email is already taken");
    } else {
      userRepository.save(userEntity);
    }
  }

  public Boolean validateLogin(String email, String password) {
    Optional<UserEntity> userOptional = userRepository.findUserByEmail(email);
    return userOptional.filter(entity -> Objects.equals(password, entity.getPassword())).isPresent();
  }

  public void deleteUser(UserEntity userEntity) {
    Optional<UserEntity> userOptional = userRepository.findUserByEmail(userEntity.getEmail());
    if (userOptional.filter(entity -> Objects.equals(userEntity.getPassword(), entity.getPassword())).isEmpty()) {
      throw new IllegalStateException("Wrong Information try again");
    } else {userRepository.delete(userOptional.get());}
  }

  public void updateUser(String email, UserDTO userDTO) {
    Optional<UserEntity> userOptional = userRepository.findUserByEmail(email);
    if (userOptional.isPresent()) {
      userOptional.get().setName(userDTO.getName());
      userOptional.get().setSurname(userDTO.getSurname());
      userRepository.save(userOptional.get());
    }

  }

  public void changePassword(String email, UserPW userPW) {
    Optional<UserEntity> userOptional = userRepository.findUserByEmail(email);
    if (userOptional.isPresent()) {
      if (validateLogin(email, userPW.getOldpassword())) {
        userOptional.get().setPassword(userPW.getNewpassword());
        userRepository.save(userOptional.get());
      } else throw new IllegalStateException("Wrong Information try again");
    }

  }


  public UserEntity getUser(String email) {
    Optional<UserEntity> userOptional = userRepository.findUserByEmail(email);
     return userOptional.orElse(null);


  }
}
