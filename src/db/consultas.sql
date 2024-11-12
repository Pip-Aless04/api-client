SELECT 
    C.col_id AS id,
    C.col_identificacion AS identificacion,
    C.col_nombre AS nombre,
    C.col_primer_apellido AS primer_apellido,
    C.col_segundo_apellido AS segundo_apellido,
    P.pue_nombre AS puesto,
    C.col_email AS email,
    C.col_estado AS estado,
    DEP.depto_nombre AS departamento,
    DIR.dir_nombre AS direccion,
    C.col_clave AS clave,
    C.col_personal_cargo AS a_cargo,
    CONCAT(C2.col_nombre, ' ', C2.col_primer_apellido, ' ', C2.col_segundo_apellido) AS nombre_jefe,
    C.col_fecha_ingreso AS fecha_ingreso,
    C.col_respuesta AS respuesta
FROM colaborador C
INNER JOIN puesto P
ON C.col_puesto = P.pue_id
INNER JOIN departamento DEP
ON C.col_depto_pertence = DEP.depto_id
INNER JOIN direccion DIR
ON C.col_dir_pertenece = DIR.dir_id
INNER JOIN colaborador C2
ON C.col_jefe_id = C2.col_id
WHERE 1=1



SELECT * FROM colaborador


SELECT * FROM descripcion_talento

SELECT 
                            T.tal_id AS id,
                            T.tal_nombre AS nombre,
                            T.tal_nota AS nota,
                            T.tal_estado AS estado,
                            T.tal_porcentaje AS porcentaje,
                            DT.desc_tal_id AS descripcion_id,
                            DT.desc_tal_texto AS descripcion,
                            DT.desc_tal_personal_a_cargo AS a_cargo,
                            DT.desc_tal_estado AS estado_descripcion
                        FROM talento T
                        JOIN descripcion_talento DT
                        ON DT.desc_tal_tal_pertenece = T.tal_id
                        JOIN colaborador C
                        ON C.col_personal_cargo = DT.desc_tal_personal_a_cargo
                        WHERE T.tal_estado = 'A'
                        AND DT.desc_tal_estado = 'A'
                        AND C.col_personal_cargo = 'si'

DELETE FROM colaborador 
WHERE col_identificacion = '119160949'

INSERT INTO colaborador(
            col_id,
            col_identificacion,
            col_nombre,
            col_primer_apellido,
            col_segundo_apellido,
            col_puesto,
            col_email,
            col_estado,
            col_depto_pertenece,
            col_dir_pertenece,
            col_pais,
            col_clave,
            col_personal_cargo,
            col_jefe_id,
            col_fecha_ingreso,
            col_respuesta
            )
            VALUES(
            CAST((SELECT NEWID() AS uuid) AS UNIQUEIDENTIFIER),
            '987654321',
            'prueba',
            'prueba',
            'prueba',
            1,
            'email',
            'A',
            4,
            1,
            1,
            'hashedPassword',
            'no',
            'c5459bbe-d834-4400-8d58-5727c384d4a0',
            '2024/1/1',
            0
            )

SELECT * FROM direccion
SELECT * FROM departamento

INSERT INTO departamento ( depto_nombre, depto_estado)
VALUES
('ABASTECIMIENTO','A'),
('ADM. GENERAL DE MANTENIMIENTO','A'),
('ADM. GENERAL DE PLANTA','A'),
('ALMACEN','A'),
('CEDI','A'),
('COCINA','A'),
('COMERCIAL','A'),
('DHCO','A'),
('FACTURACION','A'),
('FINANCIERA','A'),
('GERENCIA DE PAIS','A'),
('GERENCIA GENERAL','A'),
('HELADOS','A'),
('LABORATORIO','A'),
('LIDERES DE EQUIPO','A'),
('LOGISTICA','A'),
('MANTENIMIENTO PDV','A'),
('MERCADEO','A'),
('MIXTURAS','A'),
('PROYECTOS Y MANT PDV','A'),
('SISTEMAS INTEGRADOS DE GESTION','A'),
('TI','A'),
('TRANSPORTES','A'),
('VENDEDORES','A')


INSERT INTO direccion ( dir_nombre, dir_depto_pertenece, dir_estado)
VALUES
('CDA',11,'A'),
('MANTENIMIENTO',12,'A'),
('CDA',13,'A'),
('CDA',14,'A'),
('CDA',15,'A'),
('CDA',16,'A'),
('COMERCIAL',17,'A'),
('DHCO',18,'A'),
('CDA',19,'A'),
('FINANCIERA',20,'A'),
('GERENCIA DE PAIS',21,'A'),
('GERENCIA GENERAL',22,'A'),
('CDA',23,'A'),
('SIG',24,'A'),
('COMERCIAL',25,'A'),
('LIDERES DE EQUIPO',25,'A'),
('LOGISTICA',26,'A'),
('MANTENIMIENTO',27,'A'),
('MERCADEO',28,'A'),
('CDA',29,'A'),
('MANTENIMIENTO',30,'A'),
('SIG',31,'A'),
('COMERCIAL',32,'A'),
('CDA',33,'A'),
('COMERCIAL',34,'A')





INSERT INTO colaborador(
            col_id,
            col_identificacion,
            col_nombre,
            col_primer_apellido,
            col_segundo_apellido,
            col_puesto,
            col_email,
            col_estado,
            col_depto_pertenece,
            col_dir_pertenece,
            col_pais,
            col_clave,
            col_personal_cargo,
            col_jefe_id,
            col_fecha_ingreso,
            col_respuesta
            )
            VALUES(
            CAST((SELECT NEWID() AS uuid) AS UNIQUEIDENTIFIER),
            '987654321',
            'prueba',
            'prueba',            
            'prueba',
            1,
            'email',
            'A',
            4,
            1,
            1,
            'hashedPassword',
            'no',
            'c5459bbe-d834-4400-8d58-5727c384d4a0',
            '2024/1/1',
            0
            )

TRUNCATE TABLE direccion
TRUNCATE TABLE departamento
DELETE FROM direccion

TRUNCATE TABLE colaborador

DROP TABLE jerarquia

TRUNCATE TABLE respuesta

SELECT * FROM puesto

INSERT INTO puesto (pue_nombre)
VALUES
(N'ANALISTA DE SALUD OCUPACIONAL'),
(N'JEFE DE SALUD OCUPACIONAL Y SERV GENERALES'),
(N'ANALISTA DE ATRACCIÓN Y FIDELIZACION'),
(N'ANALISTA DE SERVICIOS GENERALES'),
(N'GESTOR DE CULTURA Y BIENESTAR'),
(N'ANALISTA DE BIENESTAR INTEGRAL'),
(N'ANALISTA DE FORMACION Y DESARROLLO'),
(N'JEFE DE BIENESTAR INTEGRAL'),
(N'DIRECTOR DE DESARROLLO HUMANO Y CUL ORG'),
(N'COORDINADORA DE FORMACION Y DESARROLLO'),
(N'COORDINADOR DE BIENESTAR INTEGRAL'),
(N'AUXILIAR DE SERVICIOS GENERALES'),
(N'JEFE DE PLANEACION Y DESARROLLO DE TALENTO'),
(N'AUXILIAR DE BIENESTAR INTEGRAL'),
(N'ANALISTA DE CONTROL GESTIÓN'),
(N'JEFE DE COSTOS Y TRANSFORMACION DIGITAL'),
(N'ANALISTA DE TRANSFORMACION DIGITAL'),
(N'AUXILIAR DE SERVICIOS FINANCIEROS'),
(N'JEFE DE SERVICIOS FINANCIEROS'),
(N'DIRECTOR FINANCIERO'),
(N'ANALISTA DE INFORMACIÓN COMERCIAL-VENTAS'),
(N'COORDINADOR DE TRANSFORMACION DIGITAL'),
(N'ANALISTA DE COSTOS'),
(N'JEFE DE CONTROL GESTION'),
(N'SOPORTE ADMINISTRATIVO 1'),
(N'GERENTE GENERAL'),
(N'ADMINISTRADOR DE PROYECTOS'),
(N'JEFE DE LOGISTICA'),
(N'ENCARGADO DE PISO CEDI'),
(N'DIRECTOR DE CADENA DE ABASTECIMIENTO'),
(N'ANALISTA DE INVENTARIOS'),
(N'JEFE DE ABASTECIMIENTO'),
(N'COORDINADOR DE PLANEACIÓN DE LA DEMANDA'),
(N'ANALISTA DE DATOS MAESTROS'),
(N'ANALISTA DE ABASTECIMIENTO'),
(N'ANALISTA DE PLANEACIÓN DE LA DEMANDA'),
(N'FACTURADOR'),
(N'AUXILIAR DE LIQUIDACION Y CARTERA'),
(N'COORDINADOR DE DISTRIBUCIÓN'),
(N'AUXILIAR DE INFO. DISTRIBUCIÓN'),
(N'ANALISTA DE I&D'),
(N'ANALISTA DE INFORMACION DE SIG'),
(N'AUXILIAR DE GESTION AMBIENTAL'),
(N'ANALISTA DE SIG'),
(N'ANALISTA DE INNOVACION'),
(N'COORDINADOR I&D'),
(N'ANALISTA DE GESTION AMBIENTAL'),
(N'DIRECTOR DE INNOVA. Y SIST. INT. GESTION'),
(N'AUDITOR SIG'),
(N'COORDINADOR DE SIG'),
(N'AUXILIAR DE VENTAS DIGITALES'),
(N'ANALISTA DE TRADE MARKETING'),
(N'JEFE DE MERCADEO DE CONSUMO MASIVO'),
(N'DESARROLLADOR DE NUEVOS NEGOCIOS'),
(N'COORDINADOR DE COMUNICACIONES'),
(N'COORDINADOR DE TRADE DE MARKETING'),
(N'JEFE DE MERCADEO DE HELADERIAS'),
(N'AUXILIAR DE SERVICIO AL CLIENTE'),
(N'ESPECIALISTA EN MARKETING DIGITAL'),
(N'DIRECTOR DE MERCADEO'),
(N'VENDEDOR'),
(N'GENERADOR DE DEMANDA'),
(N'SUPERVISOR DE VENTAS'),
(N'COORDINADOR DE PROYECTOS'),
(N'DIRECTOR DE PROYECTOS E INFRAESTRUCTURA'),
(N'INGENIERA CIVIL'),
(N'AUXILIAR DE INFORMACION COMERCIAL'),
(N'JEFE DE SERVICIOS COMERCIALES Y FRANQUICIAS'),
(N'DIRECTOR COMERCIAL'),
(N'ANALISTA DE SERVICIOS COMERCIALES'),
(N'AUXILIAR DE INVENTARIOS'),
(N'COORDINADOR DE ZONA'),
(N'JEFE DE ZONA'),
(N'COORDINADOR DE MTTO PDV'),
(N'ANALISTA DE INFORMACIÓN DE PRODUCCIÓN'),
(N'JEFE DE PRODUCCION'),
(N'AUXILIAR DE INFO. DE PRODUCCIÓN'),
(N'COORDINADOR DE PRODUCCION'),
(N'ENCARGADO DE LABORATORIO'),
(N'ENCARGADO DE PISO ALMACEN'),
(N'ANALISTA DE MANTENIMIENTO PLANTA'),
(N'JEFE MANTENIMIENTO DE PLANTA'),
(N'AUXILIAR DE MANTENIMIENTO'),
(N'ENCARGADO DE PISO PRODUCCION'),
(N'AUXILIAR DE FORMACION Y DESARROLLO'),
(N'ANALISTA DE ATRACCIÓN'),
(N'JEFE DE DHCO'),
(N'ANALISTA DE TI'),
(N'COORDINADOR DE ALMACENES'),
(N'ANALISTA DE PLANEACION Y ABASTECIMIENTO'),
(N'ANALISTA DE CALIDAD DE PDV'),
(N'JEFE DE MERCADEO'),
(N'COORDINADOR DE MARCA'),
(N'JEFE DE VENTAS'),
(N'AUXILIAR DE VENTAS'),
(N'AUXILIAR DE INFO. DE PROYECTOS'),
(N'AUXILIAR DE CONTROL Y GESTION'),
(N'AUXILIAR DE SERVICIOS COMERCIALES'),
(N'GERENTE DE PAIS'),
(N'COORDINADOR DE SERVICIOS COMERCIALES'),
(N'JEFE DE OPERACIONES COMERCIALES'),
(N'COORDINADOR DE OPERACIONES'),
(N'COORDINADOR DE PRODUCCIÓN'),
(N'SUPERVISOR DE OPERACIONES'),
(N'COORDINADOR DE LOGISTICA'),
(N'ANALISTA DE SERVICIOS FINANCIEROS'),
(N'AUXILIAR LOGISTICO'),
(N'COORDINADOR DE MERCADEO Y VENTAS')


