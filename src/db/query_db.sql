USE popsdhco;
GO

IF OBJECT_ID('respuesta', 'U') IS NOT NULL
    DROP TABLE respuesta;
GO

IF OBJECT_ID('rendimiento_individual', 'U') IS NOT NULL
    DROP TABLE rendimiento_individual;
GO

IF OBJECT_ID('calificacion', 'U') IS NOT NULL
    DROP TABLE calificacion;
GO

IF OBJECT_ID('descripcion_talento', 'U') IS NOT NULL
    DROP TABLE descripcion_talento;
GO

IF OBJECT_ID('talento', 'U') IS NOT NULL
    DROP TABLE talento;
GO

IF OBJECT_ID('jerarquia', 'U') IS NOT NULL
    DROP TABLE jerarquia;
GO

IF OBJECT_ID('colaborador', 'U') IS NOT NULL
    DROP TABLE colaborador;
GO

IF OBJECT_ID('pais', 'U') IS NOT NULL
    DROP TABLE pais;
GO

IF OBJECT_ID('direccion', 'U') IS NOT NULL
    DROP TABLE direccion;
GO

IF OBJECT_ID('departamento', 'U') IS NOT NULL
    DROP TABLE departamento;
GO

IF OBJECT_ID('puesto', 'U') IS NOT NULL
    DROP TABLE puesto;
GO

-- Creating the puesto table
CREATE TABLE puesto(
    pue_id INT NOT NULL IDENTITY(1,1),
    pue_nombre NVARCHAR(255) NOT NULL,
    PRIMARY KEY(pue_id)
);

GO
-- Inserting values into the puesto table
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

GO

-- Creating the departamento table
CREATE TABLE departamento(
    depto_id INT NOT NULL IDENTITY(1,1),
    depto_nombre NVARCHAR(30) NOT NULL,
    depto_estado CHAR(1) NOT NULL DEFAULT 'A',
    PRIMARY KEY(depto_id)
);
GO

-- Inserting values into the departamento table
INSERT INTO departamento (depto_nombre, depto_estado)
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
('VENDEDORES','A');
GO

-- Creating the direccion table
CREATE TABLE direccion(
    dir_id INT NOT NULL IDENTITY(1,1),
    dir_nombre NVARCHAR(30) NOT NULL,
    dir_depto_pertenece INT,
    dir_estado CHAR(1) NOT NULL DEFAULT 'A',
    PRIMARY KEY(dir_id),
    FOREIGN KEY (dir_depto_pertenece) REFERENCES departamento(depto_id)
);
GO

SELECT * FROM direccion
-- Inserting values into the direccion table
INSERT INTO direccion (dir_nombre, dir_depto_pertenece, dir_estado)
VALUES 
('CDA',1,'A'),
('MANTENIMIENTO',2,'A'),
('CDA',3,'A'),
('CDA',4,'A'),
('CDA',5,'A'),
('CDA',6,'A'),
('COMERCIAL',7,'A'),
('DHCO',8,'A'),
('CDA',9,'A'),
('FINANCIERA',10,'A'),
('GERENCIA DE PAIS',11,'A'),
('GERENCIA GENERAL',12,'A'),
('CDA',13,'A'),
('SIG',14,'A'),
('COMERCIAL',15,'A'),
('LIDERES DE EQUIPO',15,'A'),
('LOGISTICA',16,'A'),
('MANTENIMIENTO',17,'A'),
('MERCADEO',18,'A'),
('CDA',19,'A'),
('MANTENIMIENTO',20,'A'),
('SIG',21,'A'),
('COMERCIAL',22,'A'),
('CDA',23,'A'),
('COMERCIAL',24,'A');
GO

CREATE TABLE pais(
    pais_id INT NOT NULL IDENTITY(1,1),
    pais_nombre NVARCHAR(30) NOT NULL,
    pais_acronimo NVARCHAR(5),
    pais_estado CHAR(1) NOT NULL DEFAULT 'A',
    PRIMARY KEY(pais_id)
);
GO

-- Inserting values into the pais table
INSERT INTO pais (pais_nombre, pais_acronimo)
VALUES
(N'Costa Rica', 'CRI'),
(N'Guatemala', 'GTM'),
(N'Nicaragua', 'NIC');
GO

-- Creating the colaborador table
CREATE TABLE colaborador (
    col_id UNIQUEIDENTIFIER DEFAULT NEWID(),
    col_identificacion NVARCHAR(50) NOT NULL UNIQUE,
    col_nombre NVARCHAR(255) NOT NULL,
    col_primer_apellido NVARCHAR(255) NOT NULL,
    col_segundo_apellido NVARCHAR(255),
    col_genero CHAR(1) NOT NULL,
    col_puesto INT NOT NULL,
    col_email NVARCHAR(50) UNIQUE,
    col_estado CHAR(1) NOT NULL DEFAULT 'A',
    col_depto_pertenece INT NOT NULL,
    col_dir_pertenece INT NOT NULL,
    col_pais INT NOT NULL,
    col_clave NVARCHAR(255) NOT NULL,
    col_personal_cargo CHAR(2) DEFAULT 'no',
    col_jefe_id UNIQUEIDENTIFIER DEFAULT '',
    col_fecha_ingreso DATE NOT NULL DEFAULT (CAST(GETDATE() AS DATE)),
    col_respuesta CHAR(1) NOT NULL DEFAULT '0',
    PRIMARY KEY(col_id),
    FOREIGN KEY (col_puesto) REFERENCES puesto(pue_id),
    FOREIGN KEY (col_depto_pertenece) REFERENCES departamento(depto_id),
    FOREIGN KEY (col_dir_pertenece) REFERENCES direccion(dir_id),
    FOREIGN KEY (col_pais) REFERENCES pais(pais_id)
);
GO

-- Creating the jerarquia table
CREATE TABLE jerarquia(
    jer_col_a_cargo_id UNIQUEIDENTIFIER NOT NULL,
    jer_col_subordinado_id UNIQUEIDENTIFIER NOT NULL,
    jer_estado CHAR(1) NOT NULL DEFAULT 'A',
    PRIMARY KEY (jer_col_a_cargo_id, jer_col_subordinado_id),
    FOREIGN KEY (jer_col_a_cargo_id) REFERENCES colaborador(col_id) ON DELETE CASCADE,
    FOREIGN KEY (jer_col_subordinado_id) REFERENCES colaborador(col_id),
);
GO

--creating triggers for colaborador table
CREATE TRIGGER after_colaborador_insert
ON colaborador
AFTER INSERT
AS
BEGIN
    INSERT INTO jerarquia(jer_col_a_cargo_id, jer_col_subordinado_id)
    SELECT col_jefe_id, col_id
    FROM inserted
    WHERE col_jefe_id IS NOT NULL;
END;

GO
-- Creating triggers for colaborador table
CREATE TRIGGER after_colaborador_update_a
ON colaborador
AFTER UPDATE
AS
BEGIN
    IF EXISTS (SELECT * FROM inserted WHERE col_estado = 'A')
    BEGIN
        UPDATE jerarquia
        SET jer_estado = 'A'
        WHERE jer_col_a_cargo_id IN (SELECT col_id FROM inserted) OR jer_col_subordinado_id IN (SELECT col_id FROM inserted);
    END
END;
GO

CREATE TRIGGER after_colaborador_update_i
ON colaborador
AFTER UPDATE
AS
BEGIN
    IF EXISTS (SELECT * FROM inserted WHERE col_estado = 'I')
    BEGIN
        UPDATE jerarquia
        SET jer_estado = 'I'
        WHERE jer_col_a_cargo_id IN (SELECT col_id FROM inserted) OR jer_col_subordinado_id IN (SELECT col_id FROM inserted);
    END
END;
GO

/*
-- Inserting values into the jerarquia table
INSERT INTO jerarquia(jer_col_a_cargo_id, jer_col_subordinado_id)
VALUES
((SELECT col_id FROM colaborador WHERE col_nombre = N'Juan'), (SELECT col_id FROM colaborador WHERE col_nombre = N'Ana')),
((SELECT col_id FROM colaborador WHERE col_nombre = N'Juan'), (SELECT col_id FROM colaborador WHERE col_nombre = N'Luis')),
((SELECT col_id FROM colaborador WHERE col_nombre = N'Luis'), (SELECT col_id FROM colaborador WHERE col_nombre = N'Maria')),
((SELECT col_id FROM colaborador WHERE col_nombre = N'Ana'), (SELECT col_id FROM colaborador WHERE col_nombre = N'Carlos'));
GO
*/

-- Creating the talento table
CREATE TABLE talento(
    tal_id INT NOT NULL IDENTITY(1,1),
    tal_nombre NVARCHAR(75) UNIQUE,
    tal_significado NVARCHAR(255) NOT NULL,
    tal_nota INT DEFAULT 0,
    tal_estado CHAR(1) NOT NULL DEFAULT 'A',
    tal_porcentaje INT DEFAULT 0,
    PRIMARY KEY(tal_id)
);
GO

INSERT INTO talento (tal_nombre, tal_significado, tal_nota, tal_estado, tal_porcentaje)
VALUES
(N'adaptabilidad', N'x', 10, 'A', 0),
(N'desarrollo_de_si_mismo_y_de_otros', N'x', 15, 'A', 0),
(N'vision_sostenible', N'x', 10, 'A', 0),
(N'innovacion_con_valores', N'x', 10, 'A', 0),
(N'inspiracion_al_logro', N'x', 10, 'A', 0),
(N'mentalidad_sin_fronteras', N'x', 15, 'A', 0),
(N'pasión_por_el_invitado_y_el_consumidor', N'x', 15, 'A', 0),
(N'sentido_colectivo', N'x', 15, 'A', 0),
(N'rendimiento_individual', N'x',0, 'A', 30)

-- Creating the descripcion_talento table
CREATE TABLE descripcion_talento(
    desc_tal_id INT NOT NULL IDENTITY(1,1),
    desc_tal_texto NVARCHAR(MAX) NOT NULL,
    desc_tal_tal_pertenece INT NOT NULL,
    desc_tal_personal_a_cargo CHAR(2) DEFAULT 'no',
    desc_tal_estado CHAR(1) NOT NULL DEFAULT 'A',
    PRIMARY KEY(desc_tal_id),
    FOREIGN KEY (desc_tal_tal_pertenece) REFERENCES talento(tal_id)
);
GO

INSERT INTO descripcion_talento (desc_tal_texto, desc_tal_tal_pertenece, desc_tal_personal_a_cargo, desc_tal_estado)
VALUES
(N'Propone e incorpora de forma ágil y simple nuevas prácticas que le permiten actuar de forma efectiva.', 1, 'no', 'A'),
(N'Actúa con flexibilidad desafiando sus paradigmas y reconociendo que las cosas se pueden hacer diferente.', 1, 'no', 'A'),
(N'Está dispuesto a ser parte de los cambios aunque sea algo desconocido o no esté todo definido.', 1, 'no', 'A'),

(N'Es consciente de sus fortalezas y oportunidades, recibe con gratitud la retroalimentación de los demás y asume proactivamente su propio desarrollo.', 2, 'no', 'A'),
(N'Tiene claridad del propósito superior de la organización, alineándolo con sus propósitos personal y profesional, y trabaja por lograr un equilibrio en las dimensiones de su vida.', 2, 'no', 'A'),
(N'Se ocupa de su autocuidado, el cuidado de los demás y la adopción de hábitos saludables.', 2, 'no', 'A'),

(N'Es consciente de los riesgos asociados a la gestión y propone alternativas para mitigar los impactos a la sostenibilidad.', 3, 'no', 'A'),
(N'Participa activamente en las iniciativas que promueve la organización para contribuir al desarrollo sostenible.', 3, 'no', 'A'),
(N'Desarrolla su labor con visión de futuro sin perder de vista el presente, movilizando los recursos y asegurando los esfuerzos necesarios alineados a la estrategia.', 3, 'no', 'A'),

(N'Aplica las herramientas de innovación para optimizar las soluciones que satisfagan las necesidades del cliente interno y externo.', 4, 'no', 'A'),
(N'Asume riesgos y aprende de los errores, perseverando, para obtener nuevas respuestas y resolver retos de un entorno cambiante.', 4, 'no', 'A'),
(N'Aprovecha todos los recursos que ofrece el ecosistema de innovación para lograr de manera ágil soluciones integrales y de alto impacto.', 4, 'no', 'A'),

(N'Cumple sus compromisos en los tiempos previstos, con los recursos asignados y los estándares requeridos, retandose para lograr resultados integrales.', 5, 'no', 'A'),
(N'Se apropia hasta el final de los objetivos que tiene a cargo con recursividad, enfrentando los desafíos con decisión.', 5, 'no', 'A'),
(N'Actúa enfocado en la obtención de los resultados sin caer en excesos de planeación.', 5, 'no', 'A'),

(N'Promueve la diversidad, la equidad y la inclusión, y participa de la movilidad de talento con apertura y sin prejuicios ni sesgos.', 6, 'no', 'A'),
(N'Genera redes de interacción en las diferentes áreas, regiones y negocios para identificar oportunidades y enriquecer su gestión.', 6, 'no', 'A'),
(N'Tiene la capacidad de interactuar con personas de diferentes áreas y regiones para promover la multiculturalidad.', 6, 'no', 'A'),

(N'Se interesa por escuchar, entender y respetar los puntos de vista y las necesidades de invitados, consumidores y demás relacionados.', 7, 'no', 'A'),
(N'Demuestra una actitud de servicio hacia los demás, asegurándose de satisfacer sus necesidades y generar confianza.', 7, 'no', 'A'),
(N'Genera valor a sus grupos relacionados trabajando en red y aportando soluciones que contribuyen al logro de los resultados.', 7, 'no', 'A'),

(N'Construye confianza estableciendo relaciones cercanas en las que interactúa y crea con otros.', 8, 'no', 'A'),
(N'Busca oportunidades y colabora en diversos equipos, compartiendo su conocimiento y experiencia.', 8, 'no', 'A'),
(N'Trabaja con otros y reconoce que juntos se logramos más y mejores resultados.', 8, 'no', 'A'),

(N'Conocimiento de su trabajo: El nivel de experiencia y apropiación de los temas y actividades propios del su puesto.', 9, 'no', 'A'),
(N'Calidad: El nivel de entrega de trabajos o proyectos que realiza en el puesto. ', 9, 'no', 'A'),
(N'Rendimiento: Cumple con sus tareas en forma aceptable y completa, utilizando el tiempo, el equipo y los materiales de forma apropiada. ', 9, 'no', 'A'),

(N'Visualiza desafíos, tendencias y cambios del entorno, dando resultados con agilidad y simplicidad.', 1, 'si', 'A'),
(N'Direcciona con agilidad y flexibilidad, cambiando el rumbo o replanteando  acciones cuando se requiere.', 1, 'si', 'A'),
(N'Genera conversaciones difíciles para afrontar la ambigüedad, impulsando nuevas formas de hacer las cosas y movilizando el cambio.', 1, 'si', 'A'),

(N'Busca la retroalimentación de los demás para complementar la visión propia de sus fortalezas y oportunidades, asumiendo proactivamente su propio desarrollo.', 2, 'si', 'A'),
(N'Reconoce su vulnerabilidad, estimula y acompaña el desarrollo integral de otras personas a través de conversaciones sinceras y asertivas.', 2, 'si', 'A'),
(N'Se ocupa de su autocuidado y el cuidado de los demás, promoviendo la mejora continua de la seguridad y los hábitos saludables.', 2, 'si', 'A'),

(N'Interpreta cómo las tendencias, riesgos y oportunidades globales pueden impactar a la organización y moviliza iniciativas enfocadas a mitigar impactos y crear oportunidades.', 3, 'si', 'A'),
(N'Interactúa e influye con los grupos relacionados, definiendo acciones que generen valor compartido y promuevan la cultura de sostenibilidad.', 3, 'si', 'A'),
(N'Orienta con visión de futuro sin perder de vista el presente, movilizando los recursos y asegurando los esfuerzos necesarios alineados a la estrategia.', 3, 'si', 'A'),

(N'Alinea las iniciativas con la visión y el propósito superior removiendo obstáculos para que la innovación suceda de manera constante.', 4, 'si', 'A'),
(N'Promueve la innovación inspirando a las personas para que se sientan seguras de expresarse, asumir riesgos y tolerar fracasos.', 4, 'si', 'A'),
(N'Desafía el status-quo promoviendo el aprendizaje e iniciativas de transformación que impulsan soluciones novedosas, sin castigar el error.', 4, 'si', 'A'),

(N'Se reta a sí mismo y a los demás para el logro de resultados integrales que contribuyen al propósito superior, acompañando e inspirando el desempeño de otros.', 5, 'si', 'A'),
(N'Hace seguimiento y acompaña el logro de resultados, inspirando la excelencia para la creciente generación de valor.', 5, 'si', 'A'),
(N'Reconoce el desempeño superior de otros, motivando el mejoramiento continuo del nivel de ejecución. ', 5, 'si', 'A'),

(N'Aprecia e integra la diversidad, equidad e inclusión y promueve la movilidad para el desarrollo de talento global.', 6, 'si', 'A'),
(N'Incorpora con apertura las mejores prácticas para enriquecer y complementar la propuesta de valor desafiando sus paradigmas y creencias.', 6, 'si', 'A'),
(N'Encuentra la manera más efectiva de cumplir los objetivos estratégicos, a partir del conocimiento del contexto de cada geografía y cultura.', 6, 'si', 'A'),

(N'Se interesa por escuchar, entender y conocer a invitados, consumidores y demás relacionados, reconociendo su individualidad y comprendiendo que cada persona es única e irrepetible.', 7, 'si', 'A'),
(N'Promueve que el equipo de trabajo escuche y comprenda e incorpore las expectativas de los grupos relacionados.', 7, 'si', 'A'),
(N'Diseña y garantiza la implementación  de estrategias e indicadores que aseguren la satisfacción, la confianza y el desarrollo de relaciones duraderas.', 7, 'si', 'A'),

(N'Construye y promueve relaciones de confianza, asegurando las condiciones para el trabajo interdependiente y colaborativo.', 8, 'si', 'A'),
(N'Crea espacios de intercambio de conocimientos y experiencias para generar oportunidades de construcción colectiva.', 8, 'si', 'A'),
(N'Moviliza el trabajo con otros, teniendo en cuenta el contexto, logrando los beneficios del trabajo en red.', 8, 'si', 'A'),

(N'Conocimiento de su trabajo: El nivel de experiencia y apropiación de los temas y actividades propios del su puesto.', 9, 'si', 'A'),
(N'Calidad: El nivel de entrega de trabajos o proyectos que realiza en el puesto.', 9, 'si', 'A'),
(N'Rendimiento: Cumple con sus tareas en forma aceptable y completa, utilizando adecuadamente el tiempo y los recursos asignados.', 9, 'si', 'A');

GO



-- Creating the calificacion table
CREATE TABLE calificacion(
    cal_id INT NOT NULL IDENTITY(1,1),
    cal_desc NVARCHAR(30) NOT NULL,
    cal_porcentaje DECIMAL(4,3) NOT NULL,
    PRIMARY KEY(cal_id)
);
GO
-- Inserting values into the calificacion table
/*CORREGIR*/
INSERT INTO calificacion (cal_desc, cal_porcentaje)
VALUES 
(N'Supera', 0.1),
(N'Cumple', 0.085),
(N'Cumple parcialmente', 0.06),
(N'No cumple', 0.0);
GO

-- Creating the rendimiento_individual table
CREATE TABLE rendimiento_individual(
    rend_indi_id INT NOT NULL IDENTITY(1,1),
    rend_indi_desc NVARCHAR(MAX) NOT NULL,
    rend_indi_a_cargo CHAR(2) DEFAULT 'no',
    PRIMARY KEY (rend_indi_id)
);
GO

-- Creating the respuesta table
CREATE TABLE respuesta(
    res_id INT NOT NULL IDENTITY(1,1),
    res_col_id_subordinado UNIQUEIDENTIFIER NOT NULL,
    res_col_id_a_cargo UNIQUEIDENTIFIER,
    res_tal_id INT NOT NULL,
    res_tal_desc_id INT NOT NULL,
    res_califiacion_id INT NOT NULL,
    res_fecha_subordinado DATETIME NOT NULL DEFAULT GETDATE(),
    res_fecha_a_cargo DATETIME NOT NULL DEFAULT GETDATE(),
    res_calificacion_col_id_a_cargo INT NULL,
    PRIMARY KEY (res_id,res_fecha_subordinado,res_fecha_a_cargo),
    FOREIGN KEY (res_col_id_subordinado) REFERENCES colaborador(col_id),
    FOREIGN KEY (res_col_id_a_cargo) REFERENCES colaborador(col_id),
    FOREIGN KEY (res_tal_id) REFERENCES talento(tal_id),
    FOREIGN KEY (res_tal_desc_id) REFERENCES descripcion_talento(desc_tal_id),
    FOREIGN KEY (res_califiacion_id) REFERENCES calificacion(cal_id)
);


    PRIMARY KEY (campo1,campo2,...),
    

