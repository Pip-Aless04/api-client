IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'Pops')
    BEGIN
    CREATE DROP DATABASE Pops
    END
    USE Pops;

/*##########################################################################*/
    CREATE TABLE pais(
        pais_id INT IDENTITY(1,1) PRIMARY KEY,
        pais_nombre NVARCHAR(50) NOT NULL,
        pais_acronimo VARCHAR(4) NOT NULL,
        pais_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    INSERT INTO pais(pais_nombre, pais_acronimo) 
    VALUES
    ('Costa Rica', 'CRC'),
    ('Guatemala', 'GTM'),
    ('Nicaragua', 'NIC')
    ;
/*##########################################################################*/

    CREATE TABLE puesto(
        pue_id INT IDENTITY(1,1) PRIMARY KEY,
        pue_nombre NVARCHAR(50) NOT NULL,
        pue_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

INSERT INTO puesto(pue_nombre)
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
(N'COORDINADOR DE MERCADEO Y VENTAS'),
(N'AUXILIAR DE INFO LOGISTICA FACTURACION'),
(N'AUXILIAR DE INFORMACION DE VENTAS');
    --*/

/*##########################################################################*/
    CREATE TABLE departamento(
        depto_id INT IDENTITY(1,1) PRIMARY KEY,
        depto_nombre NVARCHAR(50) NOT NULL,
        depto_estado CHAR(1) NOT NULL DEFAULT 'A',
    );

    --/*
    INSERT INTO departamento(depto_nombre, depto_estado)
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
    ('HELADOS','A'),--'HELADOS',
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
    --*/

/*##########################################################################*/

    CREATE TABLE direccion(
        dir_id INT IDENTITY(1,1) PRIMARY KEY,
        dir_nombre NVARCHAR(50) NOT NULL,
        dir_depto_id INT NOT NULL,
        dir_estado CHAR(1) NOT NULL DEFAULT 'A',
        FOREIGN KEY(dir_depto_id) REFERENCES Departamento(depto_id)
    );

    --/*
    INSERT INTO direccion(dir_nombre, dir_depto_id, dir_estado)
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
    --*/

/*##########################################################################*/
    CREATE TABLE permiso(
        pr_id TINYINT IDENTITY(1,1) PRIMARY KEY,
        pr_nombre NVARCHAR(50) NOT NULL,
        pr_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    INSERT INTO permiso(pr_nombre)
    VALUES
    ('colaborador'),
    ('dhco_admin'),
    ('dhco_aprobador'),
    ('jefe_colaborador')

    SELECT * FROM permiso;

/*##########################################################################*/
    CREATE TABLE colaborador(
        col_id UNIQUEIDENTIFIER,
        col_identificacion NVARCHAR(50) NOT NULL,
        col_nombre NVARCHAR(50) NOT NULL,
        col_segundo_nombre NVARCHAR(50) NOT NULL,
        col_primer_apellido NVARCHAR(50) NOT NULL,
        col_segundo_apellido NVARCHAR(50) NOT NULL,
        col_genero CHAR(1) NOT NULL,
        col_email NVARCHAR(50) NOT NULL,
        col_pais_id INT NOT NULL,
        col_puesto_id INT NOT NULL,
        col_depto_id INT NOT NULL,
        col_direccion_id INT NOT NULL,
        col_fecha_ingreso DATE NOT NULL,
        col_jefatura_id UNIQUEIDENTIFIER NOT NULL,
        col_a_cargo CHAR(1) NOT NULL,
        col_estado CHAR(1) NOT NULL DEFAULT 'A',
        col_clave NVARCHAR(255) NOT NULL,
        col_permiso_id TINYINT NOT NULL,
        PRIMARY KEY(col_id), 
        FOREIGN KEY(col_pais_id) REFERENCES pais(pais_id),
        FOREIGN KEY(col_puesto_id) REFERENCES puesto(pue_id),
        FOREIGN KEY(col_depto_id) REFERENCES departamento(depto_id),
        FOREIGN KEY(col_direccion_id) REFERENCES direccion(dir_id),
        FOREIGN KEY(col_permiso_id) REFERENCES permiso(pr_id)
    );  

    
    SELECT * FROM colaborador 

/*##########################################################################*/
    CREATE TABLE talento(
        tal_id INT IDENTITY(1,1) PRIMARY KEY,
        tal_nombre NVARCHAR(50) NOT NULL,
        tal_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    --/*
    INSERT INTO talento(tal_nombre)
    VALUES
    (N'adaptabilidad'),
    (N'desarrollo_de_si_mismo_y_de_otros'),
    (N'vision_sostenible'),
    (N'innovacion_con_valores'),
    (N'inspiracion_al_logro'),
    (N'mentalidad_sin_fronteras'),
    (N'pasión_por_el_invitado_y_el_consumidor'),
    (N'sentido_colectivo'),
    (N'rendimiento_individual')
    --*/

/*##########################################################################*/
    CREATE TABLE detalle_talento(
        det_tal_id INT IDENTITY(1,1) PRIMARY KEY,
        det_tal_tal_id INT NOT NULL,
        det_tal_texto NVARCHAR(MAX) NOT NULL,
        det_tal_personal_a_cargo CHAR(1) NOT NULL,
        det_tal_estado CHAR(1) NOT NULL DEFAULT 'A',
        FOREIGN KEY(det_tal_tal_id) REFERENCES talento(tal_id)
    );

    
--/*
    INSERT INTO detalle_talento(det_tal_tal_id, det_tal_texto, det_tal_personal_a_cargo, det_tal_estado)
    VALUES
    (1, N'Propone e incorpora de forma ágil y simple nuevas prácticas que le permiten actuar de forma efectiva.', 'N', 'A'),
    (1, N'Actúa con flexibilidad desafiando sus paradigmas y reconociendo que las cosas se pueden hacer diferente.', 'N', 'A'),
    (1, N'Está dispuesto a ser parte de los cambios aunque sea algo desconocido o no esté todo definido.', 'N', 'A'),

    (2, N'Es consciente de sus fortalezas y oportunidades, recibe con gratitud la retroalimentación de los demás y asume proactivamente su propio desarrollo.', 'N', 'A'),
    (2, N'Tiene claridad del propósito superior de la organización, alineándolo con sus propósitos personal y profesional, y trabaja por lograr un equilibrio en las dimensiones de su vida.', 'N', 'A'),
    (2, N'Se ocupa de su autocuidado, el cuidado de los demás y la adopción de hábitos saludables.', 'N', 'A'),

    (3, N'Es consciente de los riesgos asociados a la gestión y propone alternativas para mitigar los impactos a la sostenibilidad.', 'N', 'A'),
    (3, N'Participa activamente en las iniciativas que promueve la organización para contribuir al desarrollo sostenible.', 'N', 'A'),
    (3, N'Desarrolla su labor con visión de futuro sin perder de vista el presente, movilizando los recursos y asegurando los esfuerzos necesarios alineados a la estrategia.', 'N', 'A'),

    (4, N'Aplica las herramientas de innovación para optimizar las soluciones que satisfagan las necesidades del cliente interno y externo.', 'N', 'A'),
    (4, N'Asume riesgos y aprende de los errores, perseverando, para obtener nuevas respuestas y resolver retos de un entorno cambiante.', 'N', 'A'),
    (4, N'Aprovecha todos los recursos que ofrece el ecosistema de innovación para lograr de manera ágil soluciones integrales y de alto impacto.', 'N', 'A'),

    (5, N'Cumple sus compromisos en los tiempos previstos, con los recursos asignados y los estándares requeridos, retándose para lograr resultados integrales.', 'N', 'A'),
    (5, N'Se apropia hasta el final de los objetivos que tiene a cargo con recursividad, enfrentando los desafíos con decisión.', 'N', 'A'),
    (5, N'Actúa enfocado en la obtención de los resultados sin caer en excesos de planeación.', 'N', 'A'),

    (6, N'Promueve la diversidad, la equidad y la inclusión, y participa de la movilidad de talento con apertura y sin prejuicios ni sesgos.', 'N', 'A'),
    (6, N'Genera redes de interacción en las diferentes áreas, regiones y negocios para identificar oportunidades y enriquecer su gestión.', 'N', 'A'),
    (6, N'Tiene la capacidad de interactuar con personas de diferentes áreas y regiones para promover la multiculturalidad.', 'N', 'A'),

    (7, N'Se interesa por escuchar, entender y respetar los puntos de vista y las necesidades de invitados, consumidores y demás relacionados.', 'N', 'A'),
    (7, N'Demuestra una actitud de servicio hacia los demás, asegurándose de satisfacer sus necesidades y generar confianza.', 'N', 'A'),
    (7, N'Genera valor a sus grupos relacionados trabajando en red y aportando soluciones que contribuyen al logro de los resultados.', 'N', 'A'),

    (8, N'Construye confianza estableciendo relaciones cercanas en las que interactúa y crea con otros.', 'N', 'A'),
    (8, N'Busca oportunidades y colabora en diversos equipos, compartiendo su conocimiento y experiencia.', 'N', 'A'),
    (8, N'Trabaja con otros y reconoce que juntos logramos más y mejores resultados.', 'N', 'A'),

    (9, N'Conocimiento de su trabajo: El nivel de experiencia y apropiación de los temas y actividades propios de su puesto.', 'N', 'A'),
    (9, N'Calidad: El nivel de entrega de trabajos o proyectos que realiza en el puesto.', 'N', 'A'),
    (9, N'Rendimiento: Cumple con sus tareas en forma aceptable y completa, utilizando el tiempo, el equipo y los materiales de forma apropiada.', 'N', 'A'),

    (1, N'Visualiza desafíos, tendencias y cambios del entorno, dando resultados con agilidad y simplicidad.', 'S', 'A'),
    (1, N'Direcciona con agilidad y flexibilidad, cambiando el rumbo o replanteando acciones cuando se requiere.', 'S', 'A'),
    (1, N'Genera conversaciones difíciles para afrontar la ambigüedad, impulsando nuevas formas de hacer las cosas y movilizando el cambio.', 'S', 'A'),

    (2, N'Busca la retroalimentación de los demás para complementar la visión propia de sus fortalezas y oportunidades, asumiendo proactivamente su propio desarrollo.', 'S', 'A'),
    (2, N'Reconoce su vulnerabilidad, estimula y acompaña el desarrollo integral de otras personas a través de conversaciones sinceras y asertivas.', 'S', 'A'),
    (2, N'Se ocupa de su autocuidado y el cuidado de los demás, promoviendo la mejora continua de la seguridad y los hábitos saludables.', 'S', 'A'),

    (3, N'Interpreta cómo las tendencias, riesgos y oportunidades globales pueden impactar a la organización y moviliza iniciativas enfocadas a mitigar impactos y crear oportunidades.', 'S', 'A'),
    (3, N'Interactúa e influye con los grupos relacionados, definiendo acciones que generen valor compartido y promuevan la cultura de sostenibilidad.', 'S', 'A'),
    (3, N'Orienta con visión de futuro sin perder de vista el presente, movilizando los recursos y asegurando los esfuerzos necesarios alineados a la estrategia.', 'S', 'A'),

    (4, N'Alinea las iniciativas con la visión y el propósito superior removiendo obstáculos para que la innovación suceda de manera constante.', 'S', 'A'),
    (4, N'Promueve la innovación inspirando a las personas para que se sientan seguras de expresarse, asumir riesgos y tolerar fracasos.', 'S', 'A'),
    (4, N'Desafía el status-quo promoviendo el aprendizaje e iniciativas de transformación que impulsan soluciones novedosas, sin castigar el error.', 'S', 'A'),

    (5, N'Se reta a sí mismo y a los demás para el logro de resultados integrales que contribuyen al propósito superior, acompañando e inspirando el desempeño de otros.', 'S', 'A'),
    (5, N'Hace seguimiento y acompaña el logro de resultados, inspirando la excelencia para la creciente generación de valor.', 'S', 'A'),
    (5, N'Reconoce el desempeño superior de otros, motivando el mejoramiento continuo del nivel de ejecución.', 'S', 'A'),

    (6, N'Aprecia e integra la diversidad, equidad e inclusión y promueve la movilidad para el desarrollo de talento global.', 'S', 'A'),
    (6, N'Incorpora con apertura las mejores prácticas para enriquecer y complementar la propuesta de valor desafiando sus paradigmas y creencias.', 'S', 'A'),
    (6, N'Encuentra la manera más efectiva de cumplir los objetivos estratégicos, a partir del conocimiento del contexto de cada geografía y cultura.', 'S', 'A'),

    (7, N'Se interesa por escuchar, entender y conocer a invitados, consumidores y demás relacionados, reconociendo su individualidad y comprendiendo que cada persona es única e irrepetible.', 'S', 'A'),
    (7, N'Promueve que el equipo de trabajo escuche y comprenda e incorpore las expectativas de los grupos relacionados.', 'S', 'A'),
    (7, N'Diseña y garantiza la implementación de estrategias e indicadores que aseguren la satisfacción, la confianza y el desarrollo de relaciones duraderas.', 'S', 'A'),

    (8, N'Construye y promueve relaciones de confianza, asegurando las condiciones para el trabajo interdependiente y colaborativo.', 'S', 'A'),
    (8, N'Crea espacios de intercambio de conocimientos y experiencias para generar oportunidades de construcción colectiva.', 'S', 'A'),
    (8, N'Moviliza el trabajo con otros, teniendo en cuenta el contexto, logrando los beneficios del trabajo en red.', 'S', 'A'),

    (9, N'Conocimiento de su trabajo: El nivel de experiencia y apropiación de los temas y actividades propios de su puesto.', 'S', 'A'),
    (9, N'Calidad: El nivel de entrega de trabajos o proyectos que realiza en el puesto.', 'S', 'A'),
    (9, N'Rendimiento: Cumple con sus tareas en forma aceptable y completa, utilizando adecuadamente el tiempo y los recursos asignados.', 'S', 'A');
--*/

/*##########################################################################*/
    CREATE TABLE tipo_evaluation(
        te_id INT IDENTITY(1,1) PRIMARY KEY,
        te_nombre NVARCHAR(50) NOT NULL,
        te_estado CHAR(1) NOT NULL DEFAULT 'A',
        te_año SMALLINT NOT NULL DEFAULT YEAR(GETDATE())
    );
    
    --/*
    INSERT INTO tipo_evaluation(te_nombre)
    VALUES
    (N'Evaluación de desempeño')
    --*/

EXEC sp_rename 'DB_POPD_BLUME.tipo_evaluation', 'tipo_evaluacion'
/*##########################################################################*/

CREATE TABLE evaluacion_categoria(
    ec_id INT IDENTITY(1,1) PRIMARY KEY,
    ec_nombre VARCHAR(50) NOT NULL,
    ec_estado CHAR(1) NOT NULL DEFAULT 'A'
)

INSERT INTO evaluacion_categoria(ec_nombre)
VALUES
('Subordinado'),
('Jefe a cargo')

/*##########################################################################*/
    CREATE TABLE evaluacion(
        ev_id INT IDENTITY(1,1) PRIMARY KEY,
        ev_tipo_evaluation INT NOT NULL,
        ev_fecha DATE NOT NULL,
        ev_estado CHAR(1) NOT NULL DEFAULT 'A',
        ev_categoria VARCHAR(50) NOT NULL,
        FOREIGN KEY(ev_tipo_evaluation) REFERENCES tipo_evaluation(te_id),
        FOREIGN KEY(ev_categoria) REFERENCES evaluacion_categoria(ec_id)
    );

    SELECT * FROM evaluacion;
    --/*
    INSERT INTO evaluacion(ev_tipo_evaluation, ev_fecha, ev_categoria)
    VALUES
    (1,  '2025-01-10', 1),
    (1,  '2024-01-10', 1),
    (1,  '2024-01-10', 2)
    --*/


    

/*##########################################################################*/
    CREATE TABLE evaluacion_detalle(
        evd_id INT IDENTITY(1,1) PRIMARY KEY,
        evd_evaluacion_id INT NOT NULL,
        evd_talento_id INT NOT NULL,
        evd_detalle_talento_id INT NOT NULL,
        valor_talento INT NOT NULL DEFAULT 0,
        porcentaje_talento DECIMAL(3,2) NOT NULL DEFAULT 0,
        valor_detalle_talento INT NOT NULL DEFAULT 0,
        FOREIGN KEY(evd_evaluacion_id) REFERENCES evaluacion(ev_id),
        FOREIGN KEY(evd_talento_id) REFERENCES talento(tal_id),
        FOREIGN KEY(evd_detalle_talento_id) REFERENCES detalle_talento(det_tal_id)
    );

    EXEC sp_rename 'evaluacion_detalle.pordentaje_talento', 'porcentaje_talento', 'COLUMN'

    SELECT * FROM evaluacion_detalle;
    SELECT * FROM nota;
/*
INSERT INTO evaluacion_detalle (evd_evaluacion_id, evd_talento_id, evd_detalle_talento_id, valor_talento, pordentaje_talento, valor_detalle_talento)  
VALUES 
(3, 1, 1, 10, 0, 0),  
(3, 1, 2, 10, 0, 0),  
(3, 1, 3, 10, 0, 0),  
(3, 2, 1, 15, 0, 0),  
(3, 2, 2, 15, 0, 0),  
(3, 2, 3, 15, 0, 0),  
(3, 3, 1, 10, 0, 0),  
(3, 3, 2, 10, 0, 0),  
(3, 3, 3, 10, 0, 0),  
(3, 4, 1, 10, 0, 0),  
(3, 4, 2, 10, 0, 0),  
(3, 4, 3, 10, 0, 0),  
(3, 5, 1, 10, 0, 0),  
(3, 5, 2, 10, 0, 0),  
(3, 5, 3, 10, 0, 0),  
(3, 6, 1, 15, 0, 0),  
(3, 6, 2, 15, 0, 0),  
(3, 6, 3, 15, 0, 0),  
(3, 7, 1, 15, 0, 0),  
(3, 7, 2, 15, 0, 0),  
(3, 7, 3, 15, 0, 0),  
(3, 8, 1, 15, 0, 0),  
(3, 8, 2, 15, 0, 0),  
(3, 8, 3, 15, 0, 0),  
(3, 9, 1, 0, 0.30, 50),  
(3, 9, 2, 0, 0.30, 25),  
(3, 9, 3, 0, 0.30, 25),
(1, 1, 1, 10, 0, 0),  
(1, 1, 2, 10, 0, 0),  
(1, 1, 3, 10, 0, 0),  
(1, 2, 1, 15, 0, 0),  
(1, 2, 2, 15, 0, 0),  
(1, 2, 3, 15, 0, 0),  
(1, 3, 1, 10, 0, 0),  
(1, 3, 2, 10, 0, 0),  
(1, 3, 3, 10, 0, 0),  
(1, 4, 1, 10, 0, 0),  
(1, 4, 2, 10, 0, 0),  
(1, 4, 3, 10, 0, 0),  
(1, 5, 1, 10, 0, 0),  
(1, 5, 2, 10, 0, 0),  
(1, 5, 3, 10, 0, 0),  
(1, 6, 1, 15, 0, 0),  
(1, 6, 2, 15, 0, 0),  
(1, 6, 3, 15, 0, 0),  
(1, 7, 1, 15, 0, 0),  
(1, 7, 2, 15, 0, 0),  
(1, 7, 3, 15, 0, 0),  
(1, 8, 1, 15, 0, 0),  
(1, 8, 2, 15, 0, 0),  
(1, 8, 3, 15, 0, 0),  
(1, 9, 1, 0, 0.30, 50),  
(1, 9, 2, 0, 0.30, 25),  
(1, 9, 3, 0, 0.30, 25),  
(2, 1, 4, 10, 0, 0),  
(2, 1, 5, 10, 0, 0),  
(2, 1, 6, 10, 0, 0),  
(2, 2, 4, 15, 0, 0),  
(2, 2, 5, 15, 0, 0),  
(2, 2, 6, 15, 0, 0),  
(2, 3, 4, 10, 0, 0),  
(2, 3, 5, 10, 0, 0),  
(2, 3, 6, 10, 0, 0),  
(2, 4, 4, 10, 0, 0),  
(2, 4, 5, 10, 0, 0),  
(2, 4, 6, 10, 0, 0),  
(2, 5, 4, 10, 0, 0),  
(2, 5, 5, 10, 0, 0),  
(2, 5, 6, 10, 0, 0),  
(2, 6, 4, 15, 0, 0),  
(2, 6, 5, 15, 0, 0),  
(2, 6, 6, 15, 0, 0),  
(2, 7, 4, 15, 0, 0),  
(2, 7, 5, 15, 0, 0),  
(2, 7, 6, 15, 0, 0),  
(2, 8, 4, 15, 0, 0),  
(2, 8, 5, 15, 0, 0),  
(2, 8, 6, 15, 0, 0),  
(2, 9, 4, 0, 0.30, 50),  
(2, 9, 5, 0, 0.30, 25),  
(2, 9, 6, 0, 0.30, 25);  
*/

    CREATE TABLE nota(
        nota_id INT IDENTITY(1,1) PRIMARY KEY,
        nota_nombre VARCHAR(20) NOT NULL,
        nota_valor DECIMAL(3,2) NOT NULL,
        nota_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    --/*
    INSERT INTO nota(nota_nombre, nota_valor)
    VALUES
    ('Supera', 1),
    ('Cumple', 0.85),
    ('Cumple parcialmente', 0.65),
    ('No cumple', 0);
    --*/

    

/*##########################################################################*/
    CREATE TABLE calificacion(
        cal_id INT IDENTITY(1,1) PRIMARY KEY,
        cal_detalle_eval INT NOT NULL,
        cal_col_subordinado UNIQUEIDENTIFIER NOT NULL,
        cal_col_jefe_a_cargo UNIQUEIDENTIFIER NOT NULL,
        cal_calificacion_subordinado INT NOT NULL,
        cal_calificacion_jefe INT NOT NULL,
        FOREIGN KEY (cal_detalle_eval) REFERENCES evaluacion_detalle(evd_id),
        FOREIGN KEY(cal_col_subordinado) REFERENCES colaborador(col_id),
        FOREIGN KEY(cal_col_jefe_a_cargo) REFERENCES colaborador(col_id),
        FOREIGN KEY(cal_calificacion_subordinado) REFERENCES nota(nota_id),
        FOREIGN KEY(cal_calificacion_jefe) REFERENCES nota(nota_id)
    );
    SELECT * FROM calificacion;



    /*
    INSERT INTO calificacion(cal_detalle_eval, cal_col_subordinado, cal_col_jefe_a_cargo, cal_calificacion_subordinado, cal_calificacion_jefe)
    VALUES
    (1, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (2, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (3, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (4, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (5, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (6, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (7, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (8, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (9, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (10, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (11, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (12, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (13, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (14, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (15, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (16, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (17, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (18, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (19, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (20, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (21, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (22, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (23, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (24, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (25, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (26, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),
    (27, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', 2, 2),

    (55, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (56, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (57, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (58, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (59, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (60, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (61, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (62, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (63, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (64, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (65, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (66, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (67, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (68, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (69, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (70, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (71, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (72, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (73, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (74, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (75, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (76, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (77, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (78, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (79, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (80, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),
    (81, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', null, null),

    */
/*##########################################################################*/
CREATE TABLE tipo_pdi(
    tp_pdi_id INT IDENTITY(1,1) PRIMARY KEY,
    tp_pdi_nombre NVARCHAR(50) NOT NULL,
    tp_pdi_año SMALLINT NOT NULL DEFAULT YEAR(GETDATE())
);
/*
INSERT INTO tipo_pdi(tp_pdi_nombre, tp_pdi_año)
VALUES
(N'Plan de Desarrollo Individual', 2024),
*/
/*##########################################################################*/
    CREATE TABLE actividades_pdi(
        act_pdi_id INT IDENTITY(1,1) PRIMARY KEY,
        act_pdi_nombre NVARCHAR(255) NOT NULL,
        act_pdi_descripcion NVARCHAR(MAX) NOT NULL,
    );
    
    --/*
    INSERT INTO actividades_pdi(act_pdi_nombre, act_pdi_descripcion)
    VALUES
    (N'Aprendizaje a través de la prácitca', N'Actividades o tareas a desarrollar en el trabajo diario o proyectos especiales, que nos permitan un aprendizaje integrado en el flujo de trabajo'),
    (N'Interacciones con otros para aprender', N'Coaching, mentoring o acompañamiento del jefe. Actividades que requieren compartir conocimiento con otros, interacción y aprendizaje de otras personas,'),
    (N'Aprendizaje formal', N'Formaciones, seminarios, talleres, capacitaciones')
    --*/

    

/*##########################################################################*/
    CREATE TABLE detalle_pdi(
        de_pdi_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        de_pdi_pdi_id INT NOT NULL,
        de_pdi_eval_id INT NOT NULL,
        de_pdi_act_id INT NOT NULL,
        de_pdi_porcentaje INT NOT NULL,
        FOREIGN KEY (de_pdi_pdi_id) REFERENCES tipo_pdi(tp_pdi_id),
        FOREIGN KEY (de_pdi_eval_id) REFERENCES evaluacion(ev_id),
        FOREIGN KEY (de_pdi_act_id) REFERENCES actividades_pdi(act_pdi_id),
    );

    /*
    INSERT INTO detalle_pdi(de_pdi_pdi_id, de_pdi_eval_id, de_pdi_act_id, de_pdi_porcentaje)
    VALUES
    (1, 1, 1, 70),
    (1, 1, 2, 20),
    (1, 1, 3, 10),
    */

    SELECT * FROM detalle_pdi

/*##########################################################################*/
CREATE TABLE detalle_pdi_historico (
    det_pdi_his_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    det_pdi_his_id_detalle_pdi INT NOT NULL,
    det_pdi_his_talento_id INT NOT NULL, -- Nombre corregido
    det_pdi_his_col_subordinado_id UNIQUEIDENTIFIER NOT NULL,
    det_pdi_his_col_jefe_id UNIQUEIDENTIFIER NOT NULL,
    det_pdi_his_fecha DATETIME2 NOT NULL,
    det_pdi_his_descripcion NVARCHAR(MAX) NOT NULL,
    FOREIGN KEY (det_pdi_his_id_detalle_pdi) REFERENCES detalle_pdi(de_pdi_id),
    FOREIGN KEY (det_pdi_his_talento_id) REFERENCES talento(tal_id), -- Corrección aquí
    FOREIGN KEY (det_pdi_his_col_subordinado_id) REFERENCES colaborador(col_id),
    FOREIGN KEY (det_pdi_his_col_jefe_id) REFERENCES colaborador(col_id)
);

/*
    INSERT INTO detalle_pdi_historico(det_pdi_his_id_detalle_pdi, det_pdi_his_talento_id, det_pdi_his_col_subordinado_id, det_pdi_his_col_jefe_id, det_pdi_his_fecha, det_pdi_his_descripcion)
    VALUES
    (1, 1, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', '2024-01-10', 'DESC......'),
    (2, 1, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', '2024-01-10', 'DESC......'),
    (3, 1, '612d9291-78c0-43d6-afa9-f0c964a8f90d', '578c5efb-3a95-4f7f-9106-c99e1d26c08d', '2024-01-10', 'DESC......'),
    */

/*##########################################################################*/
    CREATE TABLE avance_pdi(
        av_pdi_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        av_pdi_eval_id INT NOT NULL,
        av_pdi_talento_id INT NOT NULL,
        av_pdi_col_subordinado_id UNIQUEIDENTIFIER NOT NULL,
        av_pdi_col_jefe_id UNIQUEIDENTIFIER NOT NULL,
        av_pdi_fecha_propuesta DATETIME2 NOT NULL,
        av_pdi_fecha_final DATETIME2 NOT NULL,
        av_pdi_descripcion NVARCHAR(MAX) NOT NULL,
        FOREIGN KEY (av_pdi_eval_id) REFERENCES evaluacion(ev_id),
        FOREIGN KEY (av_pdi_talento_id) REFERENCES talento(tal_id),
        FOREIGN KEY (av_pdi_col_subordinado_id) REFERENCES colaborador(col_id),
        FOREIGN KEY (av_pdi_col_jefe_id) REFERENCES colaborador(col_id)
    );

    SELECT * FROM avance_pdi
/*##############################################################################*/
    CREATE TABLE historico_salida_colaborador(
        hac_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        hac_col_subordinado_id UNIQUEIDENTIFIER NOT NULL,
        hac_col_responsable_id UNIQUEIDENTIFIER NOT NULL,
        hac_fecha DATE NOT NULL,
        FOREIGN KEY(hac_col_subordinado_id) REFERENCES colaborador(col_id),
        FOREIGN KEY(hac_col_responsable_id) REFERENCES colaborador(col_id)
    );

    SELECT * FROM historico_salida_colaborador;

    CREATE TRIGGER trg_update_colaborador_estado
    ON reporte
    AFTER INSERT
    AS
    BEGIN
        SET NOCOUNT ON;

        -- Verificar si el nuevo registro tiene rep_tipo_reporte_id igual a 1
        IF EXISTS (
            SELECT 1 
            FROM inserted 
            WHERE rep_tipo_reporte_id = 1
        )
        BEGIN
            -- Actualizar col_estado a 'I' en la tabla colaborador
            UPDATE colaborador
            SET col_estado = 'I'
            FROM colaborador
            INNER JOIN inserted 
                ON colaborador.col_id = inserted.rep_col_id_aplica;

            -- Insertar un registro en la tabla historico_salida_colaborador
            INSERT INTO historico_salida_colaborador (
                hac_col_subordinado_id, 
                hac_col_responsable_id, 
                hac_fecha
            )
            SELECT 
                rep_col_id_aplica, 
                rep_col_id_solicita, 
                GETDATE()
            FROM inserted
            WHERE rep_tipo_reporte_id = 1;
        END
    END;

/*##############################################################################*/

    CREATE DROP TABLE historico_cambio_jefe(
        hcj_id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        hcj_col_subordinado_id UNIQUEIDENTIFIER NOT NULL,
        hcj_col_jefe_id UNIQUEIDENTIFIER NOT NULL,
        hcj_fecha DATE NOT NULL,
        FOREIGN KEY(hcj_col_subordinado_id) REFERENCES colaborador(col_id),
        FOREIGN KEY(hcj_col_jefe_id) REFERENCES colaborador(col_id)
    );
    

    CREATE DROP TRIGGER trg_update_colaborador_jefatura
    ON colaborador
    AFTER UPDATE
    AS
    BEGIN
        -- Verificar si el campo col_jefatura_id fue modificado
        IF UPDATE(col_jefatura_id)
        BEGIN
            INSERT INTO historico_cambio_jefe (hcj_col_subordinado_id, hcj_col_jefe_id, hcj_fecha)
            SELECT 
                i.col_id, -- ID del colaborador (subordinado)
                i.col_jefatura_id, -- Nuevo jefe
                GETDATE() -- Fecha actual
            FROM 
                inserted i
            INNER JOIN 
                deleted d ON i.col_id = d.col_id
            WHERE 
                i.col_jefatura_id <> d.col_jefatura_id; -- Solo insertar si hay un cambio real
        END
    END;

/*##########################################################################*/

    CREATE TABLE historico_cambio_depto(
        hcd_id INT IDENTITY(1,1) PRIMARY KEY,
        hcd_col_id UNIQUEIDENTIFIER,
        hcd_depto_id INT,
        hcd_fecha DATE,
        FOREIGN KEY(hcd_col_id) REFERENCES colaborador(col_id),
        FOREIGN KEY(hcd_depto_id) REFERENCES departamento(depto_id)
    );


    CREATE TRIGGER trg_update_colaborador_departamento
    ON colaborador
    AFTER UPDATE
    AS
    BEGIN
        -- Verificar si el campo col_depto_id fue modificado
        IF UPDATE(col_depto_id)
        BEGIN
            INSERT INTO historico_cambio_depto (hcd_col_id, hcd_depto_id, hcd_fecha)
            SELECT 
                i.col_id, -- ID del colaborador
                i.col_depto_id, -- Nuevo departamento
                GETDATE() -- Fecha actual
            FROM 
                inserted i
            INNER JOIN 
                deleted d ON i.col_id = d.col_id
            WHERE 
                i.col_depto_id <> d.col_depto_id; -- Solo insertar si hay un cambio real
        END
    END;

/*##########################################################################*/

    CREATE TABLE historico_cambio_direccion(
        hcd_id INT IDENTITY(1,1) PRIMARY KEY,
        hcd_col_id UNIQUEIDENTIFIER NOT NULL,
        hcd_direccion_id INT NOT NULL,
        hcd_fecha DATETIME2 NOT NULL,
        FOREIGN KEY (hcd_col_id) REFERENCES colaborador(col_id),
        FOREIGN KEY (hcd_direccion_id) REFERENCES direccion(dir_id)
    );

    CREATE TRIGGER trg_update_colaborador_direccion
    ON colaborador
    AFTER UPDATE
    AS
    BEGIN
        -- Verificar si el campo col_direccion_id fue modificado
        IF UPDATE(col_direccion_id)
        BEGIN
            INSERT INTO historico_cambio_direccion (hcd_col_id, hcd_direccion_id, hcd_fecha)
            SELECT 
                i.col_id, -- ID del colaborador
                i.col_direccion_id, -- Nuevo direccion
                GETDATE() -- Fecha actual
            FROM 
                inserted i
            INNER JOIN 
                deleted d ON i.col_id = d.col_id
            WHERE 
                i.col_direccion_id <> d.col_direccion_id; -- Solo insertar si hay un cambio real
        END
    END
/*##########################################################################*/

    CREATE TABLE historico_cambio_clave(
        hcc_id INT IDENTITY(1,1) PRIMARY KEY,
        hcc_col_id UNIQUEIDENTIFIER NOT NULL,
        hcc_codigo INT NOT NULL,
        hcc_fecha DATETIME2 NOT NULL,
        hcc_fecha_expiracion DATETIME2 NOT NULL,
        FOREIGN KEY (hcc_col_id) REFERENCES colaborador(col_id)
    );

    SELECT * FROM historico_cambio_clave

/*##############################TABLAS REPORTES############################################*/

    CREATE TABLE tipo_salida(
        ts_id INT IDENTITY(1,1) PRIMARY KEY,
        ts_nombre NVARCHAR(100) NOT NULL,
        ts_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    INSERT INTO tipo_salida(ts_nombre)
    VALUES
    ('Renuncia'),
    ('Abandono de trabajo'),
    ('Despido sin responsabilidad'),
    ('Despidp periodo de prueba'),
    ('Despido con responsabilidad'),
    ('Mutuo acuerdo'),
    ('Fallecimiento'),
    ('Jubilacion'),
    ('Termino de contrato')

    CREATE TABLE motivo_salida(
        ms_id INT IDENTITY(1,1) PRIMARY KEY,
        ms_nombre NVARCHAR(100) NOT NULL,
        ms_estado CHAR(1) NOT NULL DEFAULT 'A'
    );
    SELECT * FROM motivo_salida
    INSERT INTO motivo_salida(ms_nombre)
    VALUES
    ('Motivos personales'),
    ('Mal abiente laboral'),
    ('No cumple el perfil'),
    ('No cumple procedimientos'),
    ('Hurto'),
    ('Horarios'),
    ('Cuido de hijos'),
    ('Salario'),
    ('Mejor oportunidad laboral'),
    ('Cambio de residencia'),
    ('Enfermedad'),
    ('Cuido de parientes'),
    ('Termino de contrato'),
    ('Otro')

    CREATE TABLE tipo_novedad(
        tn_id INT IDENTITY(1,1) PRIMARY KEY,
        tn_nombre NVARCHAR(100) NOT NULL,
        tn_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    INSERT INTO tipo_novedad(tn_nombre)
    VALUES
    ('Incapacidad CCSS'),
    ('Incapacidad INS'),
    ('Licencia de maternidad'),
    ('Licencia de paternidad'),
    ('Permiso con goce'),
    ('Permiso sin goce');
    
    CREATE TABLE tipo_carta(
        tc_id INT IDENTITY(1,1) PRIMARY KEY,
        tc_nombre NVARCHAR(100) NOT NULL,
        tc_estado CHAR(1) NOT NULL DEFAULT 'A'
    );
    
    INSERT INTO tipo_carta(tc_nombre)
    VALUES
    ('Carta para retiro de FCL'),
    ('Constancia salarial'),
    ('Carta para justificación de horarios'),
    ('Carta por traslado de compañía'),
    ('Carta para licencias'),
    ('Constancia de tiempo laborado'),
    ('Carta para apertura de cuenta bancaria'),
    ('Otro')


    CREATE TABLE tipo_reporte(
        tr_id INT IDENTITY(1,1) PRIMARY KEY,
        tr_nombre NVARCHAR(100) NOT NULL,
        tr_creado_por UNIQUEIDENTIFIER NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
        tr_creado_fecha DATETIME NOT NULL,
        tr_estado CHAR(1) NOT NULL DEFAULT 'A',
        FOREIGN KEY (tr_creado_por) REFERENCES colaborador(col_id)
    );

    SELECT * FROM tipo_reporte

    INSERT INTO tipo_reporte (tr_nombre, tr_creado_por, tr_creado_fecha, tr_estado) 
    VALUES 
    ('salida_de_personal', '24fbad8b-abab-4ad1-ada1-216ec7b64995', '2024-04-01', 'A'),
    ('solicitud_de_vacaciones', '24fbad8b-abab-4ad1-ada1-216ec7b64995', '2024-04-01', 'A'),
    ('traslado_de_personal', '24fbad8b-abab-4ad1-ada1-216ec7b64995', '2024-04-01', 'A'),
    ('incapacidades_y_licencias', '24fbad8b-abab-4ad1-ada1-216ec7b64995', '2024-04-01', 'A'),    
    ('solicitud_de_cartas', '24fbad8b-abab-4ad1-ada1-216ec7b64995', '2024-04-01', 'A');


    CREATE TABLE reporte(
        rep_id INT IDENTITY(1,1) PRIMARY KEY,
        rep_col_id_solicita UNIQUEIDENTIFIER NOT NULL,
        rep_col_id_aplica UNIQUEIDENTIFIER NOT NULL,
        rep_sp_tipo_salida INT,
        rep_sp_motivo_salida INT,
        rep_sp_saldo_vacaciones INT,
        rep_tp_motivo_traslado NVARCHAR(255),
        rep_tp_depto_actual INT,
        rep_tp_depto_traslado INT,
        rep_il_tipo_novedad INT,
        rep_ca_tipo_carta INT,
        rep_ca_email_envio VARCHAR(50),
        rep_detalle_reporte NVARCHAR(MAX),
        rep_tipo_reporte_id INT NOT NULL,
        rep_pais_solicita INT,
        rep_fec_inicio DATE,    
        rep_fec_fin DATE,
        rep_otro NVARCHAR(255),
        rep_fec_envio_doc DATE,
        rep_estado CHAR(1) NOT NULL DEFAULT 'S',
        rep_fecha_transaccion DATETIME,
        FOREIGN KEY (rep_col_id_solicita) REFERENCES colaborador (col_id),
        FOREIGN KEY (rep_col_id_aplica) REFERENCES colaborador (col_id),
        FOREIGN KEY (rep_tipo_reporte_id) REFERENCES tipo_reporte (tr_id),
        FOREIGN KEY (rep_sp_tipo_salida) REFERENCES tipo_salida (ts_id),
        FOREIGN KEY (rep_sp_motivo_salida) REFERENCES motivo_salida (ms_id),
        FOREIGN KEY (rep_il_tipo_novedad) REFERENCES tipo_novedad (tn_id),
        FOREIGN KEY (rep_ca_tipo_carta) REFERENCES tipo_carta (tc_id),
        FOREIGN KEY (rep_pais_solicita) REFERENCES pais (pais_id)
    );  

    --cambiar nombre de columna
    EXEC sp_rename 'reporte.rep_ca_otro', 'rep_otro', 'COLUMN' 

    CREATE TABLE tipo_documento(
        td_id INT IDENTITY(1,1) PRIMARY KEY,
        td_nombre NVARCHAR(100) NOT NULL,
        td_estado CHAR(1) NOT NULL DEFAULT 'A'
    );

    INSERT INTO tipo_documento(td_nombre)
    VALUES
    ('carta_autorizacion_pago'),
    ('comprobante_entrega_uniformes'),
    ('cedula'),
    ('carta_despido_o_renuncia'),
    ('accion_de_personal');


    CREATE TABLE reporte_documento(
        rd_id INT IDENTITY(1,1) PRIMARY KEY,
        rd_id_reporte INT NOT NULL,
        rd_id_tipo_documento INT NOT NULL,
        rd_documento VARBINARY(MAX) NOT NULL, /*contenido del documento*/
        rd_nombre_documento NVARCHAR(100) NOT NULL, /*nombre del documento*/
        rd_extension_documento VARCHAR(10), /*extension del documento*/
        rd_fecha_documento DATETIME NOT NULL, /*fecha de envío del documento*/
        FOREIGN KEY (rd_id_reporte) REFERENCES reporte(rep_id),
        FOREIGN KEY (rd_id_tipo_documento) REFERENCES tipo_documento(td_id)
    );

    CREATE TABLE error_log(
        el_id INT IDENTITY(1,1) PRIMARY KEY,
        el_error_message NVARCHAR(MAX) NOT NULL,
        el_fecha DATETIME NOT NULL DEFAULT GETDATE()
    );
    
    END


