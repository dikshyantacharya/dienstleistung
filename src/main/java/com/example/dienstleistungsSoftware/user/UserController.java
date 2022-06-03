package com.example.dienstleistungsSoftware.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping
@RestController
public class UserController {
  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping
  public void createNewUser(
    @RequestBody
      UserEntity userEntity) {
    userService.addNewUser(userEntity);
  }

  @DeleteMapping("/delete")
  public void deleteUser(
    @RequestBody
      UserEntity userEntity) {
    userService.deleteUser(userEntity);
  }

  @GetMapping("/{email}" + "/" + "{password}")
  public Boolean validateLogin(
    @PathVariable
      String email,
    @PathVariable
      String password) {
    boolean isValid = userService.validateLogin(email, password);
    return isValid;
  }

  @GetMapping("/{email}")
  public UserEntity getUser(
    @PathVariable
      String email) {
    return userService.getUser(email);
  }

  @PutMapping("/{email}")
  public void updateUser(
    @RequestBody
      UserDTO userDTO,
    @PathVariable
      String email) {
    userService.updateUser(email, userDTO);
  }

  @PutMapping("/changepw" + "/" + "{email}")
  public void changePassword(
          @RequestBody
                  UserPW userPW,
          @PathVariable
                  String email) {
    userService.changePassword(email, userPW);
  }



}
