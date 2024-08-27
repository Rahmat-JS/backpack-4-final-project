# Changelog

## 1.0.0-alpha.30
### Fixed
* Fixing the photo deletion bug when deleting the book (#37)

## 1.0.0-alpha.29
### Added
* global Error Handler (#33)
* global Error Exception (#33)

## 1.0.0-alpha.28
### Added
* adding validations of entities (#31)
* adding a middleware for replace space and underline

## 1.0.0-alpha.27
### Added
* File server refactor and use of listeners (#22)
* image display using get method (#22)

## 1.0.0-alpha.26
### Adding
* adding decorator structures (#30)

## 1.0.0-alpha.25
### Adding
* Update functions (#29)
* Communication between entities (#29)
### Fixing
* Fix the errors created during the above steps

## 1.0.0-alpha.24
### Fixing
* Customizing output in database service functions (#28)

## 1.0.0-alpha.23
### Added
* connector of book system to database (CRUD for `book`) (#27)

**NOTE**: So far we have implemented the `CRUD system` without **updates**. According to this update, it requires the use of in-service functions such as readById. This operation was postponed until after the implementation of the `decorator`!

## 1.0.0-alpha.22
### Added
* connector of user system to database (CRUD for `user`) (#26)
* function of add order to user in order creation function

## 1.0.0-alpha.21
### Added
* connector of order system to database (CRUD for `order`) (#25)
### Fixing
* name of service and model file names

## 1.0.0-alpha.20
### Added
* connector of comment system to database (CRUD for `comment`) (#24)

## 1.0.0-alpha.19
### Added
* admin controller for get all tables and drop all tables from database (#23)

## 1.0.0-alpha.18
### Added
* connector of tag service to database (#21)

## 1.0.0-alpha.17
### Added
* middlewares structure (#18)
* decorators structure (#18)

## 1.0.0-alpha.16
### Added
* creating create book method
* added set values
### Changed
* Edit the server file to optimize (#15)

## 1.0.0-alpha.15
### Added
* completing user service (#17)
* completing user controller (#17)
* adding hash functions to utils service

## 1.0.0-alpha.14
### Added
* completing tag service (#14)
* completing tag controller (#14)
* adding some template code to db service

## 1.0.0-alpha.13
### Added
* adding utils service (#16)
### Fixed
* fixed method of exporting models

## 1.0.0-alpha.12
### Added
* services to work with controllers
* a special service for working with the database        
* the necessary configurations to work with the Atlas database
* dependency injection for controls and services to work
* a simple middleware

## 1.0.0-alpha.11
### Fixed
* fixed file server (#12)

## 1.0.0-alpha.10
### Added
* fixed file server (#12)

## 1.0.0-alpha.9
### Added
* adding controllers and router sturcture to project (#11)

## 1.0.0-alpha.8
### Added
* added delete file method to fileserver (#9)

## 1.0.0-alpha.7
### Added
* added getfile method to fileserver (#8)

## 1.0.0-alpha.6
### Added
* added base file server (#2)

## 1.0.0-alpha.5
### Added
* controller added to project (#7)

## 1.0.0-alpha.4
### Fixed
* adding some parameter to models (#6)

## 1.0.0-alpha.3
### Added
* models added to project (#5)

## 1.0.0-alpha.2
### Changed
* change middleware status (#4)
### Fixed
* change change log location (#4)

## 1.0.0-alpha.1
### Added
* adding some document (include readme and changelog) (#3)


<br><br>

---
### example
```md
## Unreleased

### Added
* New feature A
* New feature B

### Changed
* Improvement C
* Improvement D

### Fixed
* Bug fix E
* Bug fix F

## [1.0.0] - 2023-11-22

### Added
* Initial release

## [0.1.0] - 2023-10-15

### Added
* Feature X
* Feature Y

### Fixed
* Bug Z
```

editted by 🫶!