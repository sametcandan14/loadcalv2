import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Container,
  Spinner,
  Table,
} from "react-bootstrap";
import { Plus, Pencil, Trash } from "react-bootstrap-icons";

interface ContainerItem {
  id: number;
  name: string;
  width: number;
  height: number;
  length: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const CONTAINERS_API = `${API_BASE_URL}/containers.php`;

const Containers: React.FC = () => {
  const [containers, setContainers] = useState<ContainerItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    fetchContainers();
  }, []);

  const fetchContainers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(CONTAINERS_API);
      setContainers(res.data);
    } catch (err) {
      alert("Failed to fetch containers.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!name.trim() || !width || !length || !height) {
      alert("Please fill in all fields.");
      return;
    }
    if (Number(length) < Number(width)) {
      alert("Length must be greater than or equal to Width.");
      return;
    }

    try {
      await axios.post(CONTAINERS_API, {
        name: name.trim(),
        width: Number(width),
        length: Number(length),
        height: Number(height),
      });
      setName("");
      setWidth("");
      setLength("");
      setHeight("");
      fetchContainers();
    } catch (err) {
      alert("Failed to add container.");
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this container?"))
      return;
    try {
      await axios.delete(`${CONTAINERS_API}?id=${id}`);
      fetchContainers();
    } catch (err) {
      alert("Failed to delete container.");
      console.error(err);
    }
  };

  const handleEdit = async (container: ContainerItem) => {
    const newName = window.prompt("Edit container name:", container.name);
    if (newName === null || !newName.trim()) return;
    try {
      await axios.post(CONTAINERS_API, {
        action: "edit",
        id: container.id,
        name: newName.trim(),
        width: container.width,
        length: container.length,
        height: container.height,
      });
      fetchContainers();
    } catch (err) {
      alert("Failed to edit container.");
      console.error(err);
    }
  };

  return (
    <Container className="my-4">
      <Form className="mb-4">
        <Row className="align-items-center g-2">
          <Col xs={12} sm={4} md={3}>
            <Form.Control
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Container Name"
            />
          </Col>
          <Col xs={4} sm={2} md={2}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Width (mm)"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                min={1}
                aria-label="Width"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={4} sm={2} md={2}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Length (mm)"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min={1}
                aria-label="Length"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs={4} sm={2} md={2}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Height (mm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min={1}
                aria-label="Height"
              />
              <InputGroup.Text>mm</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col xs="auto">
            <Button
              onClick={handleAdd}
              variant="primary"
              aria-label="Add Container"
            >
              <Plus className="me-1" /> Add
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Width (mm)</th>
              <th>Length (mm)</th>
              <th>Height (mm)</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {containers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No containers found.
                </td>
              </tr>
            ) : (
              containers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.width}</td>
                  <td>{c.length}</td>
                  <td>{c.height}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleEdit(c)}
                      aria-label={`Edit container ${c.name}`}
                    >
                      <Pencil />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(c.id)}
                      aria-label={`Delete container ${c.name}`}
                    >
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Containers;
