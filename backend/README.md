#  responsive-registration-backend

Proyecto Backend sobre la generación de responsivas. Este proyecto usa como base la Arquitectura Limpia, 

## Esctructura del proyecto


```bash
├── dist
├── node_modules
├── public
│   ├── responsives
│   │   ├── *.pdf
├── src
│   ├── config
│   │   ├── *.ts
│   ├── data
│   │   ├── mysql
│   │   │   ├── models
│   ├── domain
│   │   ├── datasources
│   │   │   ├── index.ts
│   │   │   ├── auth
│   │   │   │   ├── auth.datasource.ts
│   │   ├── dtos
│   │   │   ├── auth
│   │   │   │   ├── auth.dto.ts
│   │   │   ├── index.ts
│   │   ├── entities
│   │   │   ├── auth.entity.ts
│   │   │   ├── index.ts
│   │   ├── errors
│   │   │   ├── custom.error.ts
│   │   │   ├── index.ts
│   │   ├── interfaces
│   │   │   ├── user.interface.ts
│   │   │   ├── index.ts
│   │   ├── repositories
│   │   │   ├── auth.repository.ts
│   │   │   ├── index.ts
│   │   ├── use-cases
│   │   │   ├── auth
│   │   │   │   ├── login.use-case.ts
│   │   │   ├── index.ts
│   ├── infrastructure
│   │   ├── datasources
│   │   │   ├── auth.datasources.impl.ts
│   │   │   ├── index.ts
│   │   ├── mappers
│   │   │   ├── auth.mapper.ts
│   │   │   ├── index.ts
│   │   ├── repositories
│   │   │   ├── auth.repository.impl.ts
│   │   │   ├── index.ts
│   ├── presentation
│   │   ├── auth
│   │   │   ├── controller.ts
│   │   │   ├── routes.ts
│   │   ├── routes.ts
│   │   ├── server.ts
│   ├── app.ts
├── package.json
├── package-lock.json
└── .gitignore
```


**config**
Archivos de configuracion de librerías externas


**data**
Referencias directas hacia la base datos. modelos y configuracion para la conexión con MySQL


**domain**
En esta carpeta se almacena toda la regla de negocio, no debe contener nada que no sea codigo propio.

 1. datasources: Reglas de como va a lucir los datasources (fuentes de datos).
 2. dtos (data transfer object): Son objetos que nos van a ayudar a mover datos de un lado a otro.
 3. entities: Objetos similares a como debe lucir en la base de datos. Si el objeto en la base de datos cambia, este cambio debe hacerse en el archivo mapper de la carpeta infrastructure, con el fin de no alterar el funcionamiento de la aplicación.
 4. errors: Errores personalizados. 
 5. repositories: Como deben lucir los repositorios.
 6.  use-cases: Indica que tiene que hacer o que llamar para poder ejecutar algo.


**infrastructure**
En esta carpeta se almacena todas las implementaciones.

 1. datasources: En este archivo ya podemos hacer la conexion con los archivos de la bd para ir creando nuevos registros.
 2. mappers: objetos que reciben otros objetos para tranformarlos a otros, esto con la finalidad de mantener uniformidad en el proyecto, como se mencionó anteriormente, si cambiamos alguna columna de la base de datos, lo ideal sería modificar este archivo para que lo mapee al nombre anterior, para no tener que modificar todo el proyecto.
 3. repositories: Estos archivos hacen de puente para poder llegar al datasource y no hacerlo de manera directa, esto por la misma razon de los mappers, en caso de que haya un cambio en el datasource, solo modificar este archivo y no cada proyecto donde haya una transferencia de datos.

**presentation**
En esta carpeta se almacena todos los archivos que sean mas de cara al usuario final.
1. modules: Cada carpeta al interior de presentation representa un modulo y cada modulo tendra su controlador y archivo de rutas donde se especificara el prefijo del modulo y sus rutas.
2. routes.ts: En este archivo se registraran las rutas.
3. server: Configuracion del servidor.



## Como crear un nuevo endpoint
En este ejemplo veremos como traer una lista de **Trainees** de la tabla de MySQL.


***Nota**: En la mayoria de carpetas crearemos un barrel file, para no hacer las importaciones tan largas, sin embargo en los siguientes pasos no mencionaremos su creacion para no hacerlo mas largo de lo necesario.*


 - Crearemos la entidad como aparecen en la base de datos, dentro de la carpeta **domain/entities** en un archivo llamado **trainees.entity.ts**.

```
export class TraineesEntity {
  constructor(
	public id: string,
    public name: string,
    public lastName: string,
    public secondLastName: string,
    public employeeNumber: string,
  ) {}
}
```

- A continuacion, crearemos el archivo **domain/dtos/trainees/get-trainees.dto.ts**, en el caso de un GET no tiene mucha complejidad, sin embargo, en un POST en esta seccion podemos hacer validaciones en caso de que falte algun dato podemos regresar un error en la primera posicion del array, como en este caso no estamos validando nada regresaremos *undefined*.

```
export class GetTraineesDto {
  static getTrainees(): [string?, GetTraineesDto?] {
	return [undefined, new GetTraineesDto()]
  }
}
```

- En el archivo **domain/datasources/trainees.datasource.ts** crearemos la forma que debera tener nuestro datasource, aqui usaremos el dto para señalar que tipo de objeto recibirá como parametro y la entidad para lo que el datasource regresará.

```
import { TraineesEntity } from '../entities'

export abstract class TraineesDatasource {
  abstract getTrainees(): Promise<TraineesEntity[]>
}
```

- En la carpeta **data/mysql/models/** crearemos el archivo **trainee.model.ts** en este archivo definiremos el modelo de la tabla de mysql que almacena los trainees, para este proyecto usaremos sequelize.

```
import { DataTypes, Model } from 'sequelize'
import sequelize from '../mysql-database'

class TraineeModel extends Model {}

TraineeModel.init(
  {
	id: {
      type: DataTypes.STRING,
	  allowNull: false,
	  primaryKey: true
	},
	name: {
	  type: DataTypes.STRING,
	  allowNull: false
	},
	last_name: {
	  type: DataTypes.STRING,
	  allowNull: false
	},
	second_last_name: {
	  type: DataTypes.STRING,
	  allowNull: false
	},
	employee_number: {	
	  type: DataTypes.STRING,
	  allowNull: false,
	},
  },
  {
	modelName: 'trainees',
	sequelize,
	timestamps: false,
	createdAt: false,
	updatedAt: false,
  }
)

export default TraineeModel
```

- Crearemos el archivo **infrastructure/mappers/trainees.mapper.ts** donde tendremos una funcion que nos ayudara a darle forma a lo que nos regrese la base de datos.

```
import { TraineesEntity } from "../../domain/entities"

export class TraineesMapper {
  static traineesEntityFromObject(object: {[key: string]: any }) {
    const {
      id,
	  name,
	  last_name,
	  second_last_name,
      employee_number,
	} = object

	return new TraineesEntity(
	  id,
	  name,
	  last_name,
	  second_last_name,
      employee_number,
	)
  }
}
```

- Ahora crearemos la implementacion del datasource, ya definimos la forma que debe tener en el paso anterior, ahora lo usaremos, creamos un nuevo archivo **infrastructure/datasources/trainees.datasources.impl.ts** donde traeremos todos los registros de la tabla **trainees** de nuestra tabla en MySQL con el metodo findAll.

```
import { TraineeModel } from "../../data/mysql/models";

import { TraineesDatasource } from "../../domain/datasources";
import { TraineesEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";

import { TraineesMapper } from "../mappers";

export class TraineesDatasourceImpl implements TraineesDatasource {
  async getTrainees(): Promise<TraineesEntity[]> {
	try {
	  const trainees = await TraineeModel.findAll();
	  return trainees.map(TraineesMapper.traineesEntityFromObject);
    } catch (error) {
	  if (error instanceof CustomError) throw error
	  throw CustomError.internalError();
	}
  }
}
```

- Crearemos la clase que nos dira como debe de lucir nuestro repositorio, en la ruta **domain/repositories/trainees.repository.ts**.

```
import { GetTraineesDto } from "../dtos";
import { TraineesEntity } from "../entities";

export abstract class TraineesRepository {
  abstract getTrainees(getTraineesDto: GetTraineesDto): Promise<TraineesEntity[]>;
}
```

- Ahora crearemos la implementacion del repositorio en la ruta **infrastructure/repositories/trainees.repository.ts** donde añadiremos el metodo getTrainees que recibirá como parametro una instancia del GetTraineesDto y retornaremos un arreglo de Trainees.

```
import { TraineesDatasource } from "../../domain/datasources";
import { TraineesEntity } from "../../domain/entities";
import { TraineesRepository } from "../../domain/repositories";

export class TraineesRepositoryImpl implements TraineesRepository {
  constructor( private readonly traineesDatasource: TraineesDatasource) { }

  getTrainees(): Promise<TraineesEntity[]> {
	return this.traineesDatasource.getTrainees()
  }
}
```

- En la ruta **domain/use-cases/trainees/get-trainees.use-cases.ts** crearemos el caso de uso para traer los trainees.

```
import { GetTraineesDto } from "../../dtos";
import { TraineesRepository } from "../../repositories";

interface Trainees {
  id: string,	
  name: string,
  lastName: string,
  secondLastName?: string,
  employeeNumber?: string,
}

interface GetTraineesUseCase {
  execute(getTraineesDto: GetTraineesDto): Promise<Trainees[]>
}

export class GetTrainees implements GetTraineesUseCase {
  
  constructor(private  readonly  traineesRepository: TraineesRepository)  {}

  async  execute(getTraineesDto: GetTraineesDto): Promise<Trainees[]>  {
	const  trainees  =  await  this.traineesRepository.getTrainees(getTraineesDto);
	return  trainees;
  }
}
```

- Crearemos el controlador del modulo trainees en la ruta **presentation/trainees/controller.ts** con un metodo para manejar errores 

```
import { Request, Response } from "express"

import { CustomError } from "../../domain/errors"
import { TraineesRepository } from "../../domain/repositories"
import { GetTraineesDto } from "../../domain/dtos"
import { GetTrainees } from "../../domain/use-cases"

export class TraineesController {
  constructor(private readonly repository: TraineesRepository) {}
  
  private handleError = (error: unknown, res: Response) => {
	if (error instanceof CustomError)
	  return res.status(error.statusCode).json({ error: error.message }) 
	
	return  res.status(500).json({ error: "Internal server error" });
};

  getTrainees = async (req: Request, res: Response) => {

    const [error, getTraineesDto] = GetTraineesDto.getTrainees()
	
	if (error) return res.status(400).json({ error })
	
	return new GetTrainees(this.repository)
	  .execute(getTraineesDto!)
	  .then(data => res.json(data))
	  .catch(error => this.handleError(error, res))
  }
}
```

- Ahora crearemos las rutas que usarán el prefijo **/api/trainees**, este prefijo lo crearemos en el siguiente paso y como usaremos la raíz de dicho prefijo dejaremos la ruta como **/**, esto en el archivo **presentation/trainees/routes.ts**, con las implementaciones de los archivos creados anteriormente, deberá quedar de la siguiente manera.

```
import { Router } from "express";
import { TraineesController } from "./controller";
import { TraineesDatasourceImpl } from "../../infrastructure/datasources";
import { TraineesRepositoryImpl } from "../../infrastructure/repositories";

export class TraineesRoutes {
  static get routes(): Router {
    const router = Router()

	const datasource = new TraineesDatasourceImpl()
	const repository = new TraineesRepositoryImpl(datasource)
	const controller = new TraineesController(repository)
	
	router.use('/', controller.getTrainees)
	
	return router
  }
}
```

-  En **presentation/routes.ts**  importaremos las rutas anteriormente creadas y llamaremos el metodo "routes".

```
import { Router } from "express";
import { TraineesRoutes } from "./trainees/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

	router.use('/api/trainees', TraineesRoutes.routes)

	return router
  }
}
```
